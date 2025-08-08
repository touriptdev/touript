import React, { useRef, useEffect, useState } from 'react';

// Lightweight Spaceship Game (single-file React component)
// - Default export React component
// - Uses an HTML canvas for rendering
// - Tailwind-friendly container classes (no Tailwind required to run)
// - Controls: Arrow keys or A/D to move, Space to shoot, touch support on mobile
// - Copy this file into a Vite/CRA React project and render <LightweightSpaceshipGame />

export default function LightweightSpaceshipGame() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('Press START to play');

  // Game state (kept in refs to avoid rerenders)
  const stateRef = useRef({
    width: 480,
    height: 640,
    player: null,
    bullets: [],
    enemies: [],
    keys: {},
    lastShot: 0,
    spawnTimer: 0,
    elapsed: 0,
    lastTime: 0,
  });

  // Initialize player and game
  const resetGame = () => {
    const s = stateRef.current;
    s.width = 480;
    s.height = 640;
    s.player = {
      x: s.width / 2,
      y: s.height - 60,
      radius: 14,
      speed: 260, // px/sec
      color: '#7dd3fc',
    };
    s.bullets = [];
    s.enemies = [];
    s.keys = {};
    s.lastShot = 0;
    s.spawnTimer = 0;
    s.elapsed = 0;
    s.lastTime = 0;
    setScore(0);
    setLives(3);
    setLevel(1);
    setMessage('Good luck!');
  };

  // Spawn enemies using level to scale difficulty
  const spawnEnemy = () => {
    const s = stateRef.current;
    const lanePadding = 30;
    const x = Math.random() * (s.width - lanePadding * 2) + lanePadding;
    const size = 14 + Math.floor(Math.random() * 12);
    const speed = 40 + Math.random() * 40 + level * 8;
    s.enemies.push({ x, y: -size - 10, size, speed, hp: size > 22 ? 2 : 1, color: '#fca5a5' });
  };

  // Utility: simple AABB collision for bullets/enemies
  const isColliding = (bx, by, br, ex, ey, ersize) => {
    const dx = Math.abs(bx - ex);
    const dy = Math.abs(by - ey);
    const rsum = br + ersize;
    return dx * dx + dy * dy <= rsum * rsum;
  };

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const s = stateRef.current;

    // Resize canvas to match CSS / device pixel ratio
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(320, Math.floor(rect.width * dpr));
      canvas.height = Math.max(480, Math.floor(rect.height * dpr));
      s.width = canvas.width / dpr;
      s.height = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (s.player) {
        s.player.y = s.height - 60;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const step = (time) => {
      if (!s.lastTime) s.lastTime = time;
      const dt = Math.min(1 / 30, (time - s.lastTime) / 1000);
      s.lastTime = time;
      if (running) update(dt);
      render(ctx);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [running, level]);

  // Update game state
  const update = (dt) => {
    const s = stateRef.current;
    s.elapsed += dt;

    // Player movement
    const p = s.player;
    if (!p) return;

    const left = s.keys.ArrowLeft || s.keys.a || s.keys.A;
    const right = s.keys.ArrowRight || s.keys.d || s.keys.D;
    if (left && !right) p.x -= p.speed * dt;
    if (right && !left) p.x += p.speed * dt;
    p.x = Math.max(16, Math.min(s.width - 16, p.x));

    // Shooting (space)
    if ((s.keys[' '] || s.keys.Space) && s.elapsed - s.lastShot > 0.25) {
      s.bullets.push({ x: p.x, y: p.y - 18, r: 4, speed: 420 });
      s.lastShot = s.elapsed;
    }

    // Update bullets
    for (let i = s.bullets.length - 1; i >= 0; i--) {
      const b = s.bullets[i];
      b.y -= b.speed * dt;
      if (b.y < -10) s.bullets.splice(i, 1);
    }

    // Spawn enemies
    s.spawnTimer += dt;
    const spawnInterval = Math.max(0.35, 1.2 - level * 0.08);
    if (s.spawnTimer > spawnInterval) {
      s.spawnTimer = 0;
      spawnEnemy();
    }

    // Move enemies
    for (let i = s.enemies.length - 1; i >= 0; i--) {
      const e = s.enemies[i];
      e.y += e.speed * dt;
      if (e.y > s.height + 40) {
        // Enemy got past player -> lose life
        s.enemies.splice(i, 1);
        setLives((l) => {
          const nl = l - 1;
          if (nl <= 0) endGame();
          return nl;
        });
        continue;
      }

      // Collision with bullets
      for (let j = s.bullets.length - 1; j >= 0; j--) {
        const b = s.bullets[j];
        if (isColliding(b.x, b.y, b.r, e.x, e.y, e.size)) {
          s.bullets.splice(j, 1);
          e.hp -= 1;
          if (e.hp <= 0) {
            s.enemies.splice(i, 1);
            setScore((sc) => sc + 10);
            // level up occasionally
            if ((score + 10) % 100 === 0) {
              setLevel((lv) => lv + 1);
            }
          }
          break;
        }
      }

      // Collision with player
      if (isColliding(p.x, p.y, p.radius, e.x, e.y, e.size)) {
        s.enemies.splice(i, 1);
        setLives((l) => {
          const nl = l - 1;
          if (nl <= 0) endGame();
          return nl;
        });
      }
    }
  };

  // Render everything
  const render = (ctx) => {
    const s = stateRef.current;
    // clear
    ctx.clearRect(0, 0, s.width, s.height);

    // background grid
    ctx.fillStyle = '#071024';
    ctx.fillRect(0, 0, s.width, s.height);

    // subtle stars
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = i % 7 === 0 ? '#9ca3af' : '#0ea5a4';
      const sx = (i * 97) % s.width;
      const sy = ((i * 43) + (stateRef.current.elapsed * (i % 5))) % s.height;
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }

    // draw player (triangle spaceship)
    const p = s.player;
    if (p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(12, 12);
      ctx.lineTo(-12, 12);
      ctx.closePath();
      ctx.fillStyle = p.color;
      ctx.fill();
      // cockpit
      ctx.beginPath();
      ctx.arc(0, -4, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#0369a1';
      ctx.fill();
      ctx.restore();
    }

    // bullets
    for (const b of s.bullets) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = '#fde68a';
      ctx.fill();
    }

    // enemies
    for (const e of s.enemies) {
      ctx.beginPath();
      ctx.moveTo(e.x, e.y - e.size);
      ctx.lineTo(e.x + e.size, e.y + e.size);
      ctx.lineTo(e.x - e.size, e.y + e.size);
      ctx.closePath();
      ctx.fillStyle = e.color;
      ctx.fill();
      if (e.hp > 1) {
        ctx.fillStyle = '#b91c1c';
        ctx.fillRect(e.x - e.size / 2, e.y - e.size / 4, e.size, 3);
      }
    }

    // UI overlay
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(8, 8, 220, 64);
    ctx.fillStyle = '#e6f7ff';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText(`Score: ${score}`, 16, 28);
    ctx.fillText(`Lives: ${lives}`, 16, 48);
    ctx.fillText(`Level: ${level}`, 120, 28);
    ctx.fillText(message, 120, 48);
  };

  const endGame = () => {
    setRunning(false);
    setMessage('Game Over — Press START to play again');
  };

  // Keyboard handlers
  useEffect(() => {
    const down = (e) => {
      stateRef.current.keys[e.key] = true;
      // prevent page scroll on arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
    };
    const up = (e) => {
      delete stateRef.current.keys[e.key];
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Touch controls (simple left/right zones and a shoot button)
  const attachTouch = (container) => {
    if (!container) return;
    let leftActive = false;
    let rightActive = false;
    const onTouchStart = (ev) => {
      for (const t of ev.touches) {
        const rect = container.getBoundingClientRect();
        const x = t.clientX - rect.left;
        if (x < rect.width * 0.33) leftActive = true;
        else if (x > rect.width * 0.66) rightActive = true;
        else stateRef.current.keys[' '] = true; // middle = shoot
      }
      updateTouchKeys();
    };
    const onTouchEnd = () => {
      leftActive = rightActive = false;
      delete stateRef.current.keys[' '];
      updateTouchKeys();
    };
    const updateTouchKeys = () => {
      stateRef.current.keys.ArrowLeft = leftActive;
      stateRef.current.keys.ArrowRight = rightActive;
    };
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchend', onTouchEnd);
  };

  // Start/stop handlers
  const handleStart = () => {
    resetGame();
    setRunning(true);
  };
  const handleStop = () => {
    setRunning(false);
    setMessage('Paused — Press START to resume');
  };

  // Attach touch on mount to the canvas container
  useEffect(() => {
    const el = canvasRef.current;
    if (el) attachTouch(el);
  }, []);

  // Small helper: container styling (Tailwind-friendly)
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">Lightweight Spaceship Game</h2>
      <div className="border rounded-lg overflow-hidden shadow-md">
        <div className="relative" style={{ paddingTop: '133%' }}>
          {/* Canvas fills parent */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              touchAction: 'none',
            }}
          />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-900 text-slate-100">
          <div>
            <button
              className="mr-2 px-3 py-1 rounded bg-sky-500 hover:bg-sky-600"
              onClick={running ? handleStop : handleStart}
            >
              {running ? 'Pause' : 'Start'}
            </button>
            <button
              className="px-3 py-1 rounded bg-amber-400 hover:bg-amber-500 text-slate-900"
              onClick={() => {
                resetGame();
                setRunning(false);
                setMessage('Press START to play');
              }}
            >
              Reset
            </button>
          </div>
          <div className="text-sm">
            <div>Score: {score}</div>
            <div>Lives: {lives}</div>
          </div>
        </div>
        <div className="p-3 text-sm text-slate-600 bg-white">
          <div className="mb-2">Controls: ← / → or A / D to move, Space to shoot. On touch — left/middle/right zones.</div>
          <div>Goal: Survive and shoot enemies. Difficulty increases with score.</div>
        </div>
      </div>
    </div>
  );
}
