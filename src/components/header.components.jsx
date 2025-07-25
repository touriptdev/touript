import {
  User02Icon,
} from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ButtonWithBorder from "./buttons/buttonWithBorder.components";
import IconButton from "./buttons/iconButton.components";
import TabBarButton from "./buttons/tabBarButton.components";
import { navItems } from "../utils/navItems";
import { tabItems } from "../utils/tabItems";

function HeaderLarge() {
  const location = useLocation();
  const desktopNavRefs = useRef([]);
  const mobileTabRefs = useRef([]);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const updateIndicator = () => {
      const desktopIndex = navItems.findIndex(
        (item) => location.pathname === item.link
      );
      const desktopEl = desktopNavRefs.current[desktopIndex];
      if (desktopEl) {
        setIndicatorStyle({
          left: desktopEl.offsetLeft,
          width: desktopEl.offsetWidth,
        });
      }

      // Mobile tab underline
      const mobileIndex = tabItems.findIndex((item) => {
        // handle dynamic routes like /profile/:id
        const basePath = location.pathname.split("/")[1];
        return item.link === `/${basePath}` || location.pathname === item.link;
      });
      const mobileEl = mobileTabRefs.current[mobileIndex];
      if (mobileEl) {
        setMobileIndicatorStyle({
          left: mobileEl.offsetLeft,
          width: mobileEl.offsetWidth,
        });
      }
    };

    updateIndicator();
    // const timer = setTimeout(updateIndicator, 10);
    // return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div>
      <div className="hidden lg:flex items-center justify-between relative px-8 ">
        {/* Logo */}
        <Link
          to="/"
          className="font-poppins font-medium text-gray-900 text-2xl"
        >
          <span className="">touript</span>
        </Link>

        {/* Nav Bar */}

        <div className="absolute flex items-center gap-8  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-poppins text-base font-medium text-gray-700 h-14">
          {/* Animated Underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-emerald-500 transition-all duration-300 ease-in-out"
            style={{ ...indicatorStyle }}
          />

          {navItems.map((item, idx) => (
            <div
              key={item.link}
              ref={(el) => {
                if (el) desktopNavRefs.current[idx] = el;
              }}
              className="relative"
            >
              <ButtonWithBorder
                iconText={item.text}
                iconName={item.icon}
                iconLink={item.link}
                useNavLink={true}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-8 font-poppins text-base font-medium text-gray-700 h-14">
          {/* Create Account [Sign Up] */}
          <ButtonWithBorder iconText="Create Account" iconLink="/signup" />
          {/* Person Image Area [Login]*/}
          <div className="w-14 h-14 bg-transparent border-2 border-gray-200 rounded-full flex items-center justify-center">
            <IconButton
              buttonSize={12}
              iconSize={24}
              iconName={User02Icon}
              bgColor="bg-gray-200"
              iconColor="text-gray-700"
              iconLink="/signin"
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 flex items-center justify-evenly w-full shadow-[0_-1px_0px_rgba(0,0,0,0.05)] bg-white z-50">
        {/* Mobile Animated Indicator */}
        <div
          className="absolute top-0 h-0.5 bg-emerald-500 transition-all duration-300 ease-in-out"
          style={{
            left: mobileIndicatorStyle.left || 0,
            width: mobileIndicatorStyle.width || 0,
          }}
        />

        {tabItems.map((item, idx) => (
          <div
            key={item.link}
            ref={(el) => {
              if (el) mobileTabRefs.current[idx] = el;
            }}
            className="relative"
          >
            <TabBarButton
              iconText={item.text}
              iconName={item.icon}
              iconLink={item.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderLarge;
