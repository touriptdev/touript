import { User02Icon } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonWithBorder from "./buttons/buttonWithBorder.components";
import IconButton from "./buttons/iconButton.components";
import TabBarButton from "./buttons/tabBarButton.components";
import { navItems } from "../utils/navItems";
import { tabItems } from "../utils/tabItems";
import { HugeiconsIcon } from "@hugeicons/react";

function HeaderLarge() {
  const location = useLocation();
  const desktopNavRefs = useRef([]);
  const mobileTabRefs = useRef([]);
  const navigate = useNavigate();

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const updateIndicator = () => {
      const desktopIndex = navItems.findIndex(
        (item) => location.pathname === item.link,
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
      {/* <div className="hidden lg:flex items-center justify-between bg-gray-50 relative px-8 py-4 "> */}
      <div className="absolute top-0 z-10 w-full">
        <div className="hidden w-full items-center justify-between px-8 py-4 lg:flex">
          {/* Logo */}
          <Link
            to="/"
            className="font-poppins text-2xl font-medium text-gray-900"
          >
            <span className="">touript</span>
          </Link>
          {/* Nav Bar */}
          <div className="font-poppins absolute top-1/2 left-1/2 flex h-14 -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-base font-medium text-gray-700">
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
          <div className="font-poppins flex h-14 items-center justify-end gap-4 text-base font-medium text-gray-700">
            {/* Create Account [Sign Up] */}

            <button
              onClick={() =>
                navigate("/signup", {
                  state: { backgroundLocation: location },
                })
              }
              className="font-poppins flex h-full cursor-pointer items-center rounded-lg border-1 border-gray-200 bg-gray-50 px-4 py-4 text-sm font-medium text-gray-500 transition-all delay-150 duration-300 hover:border-transparent hover:bg-white hover:text-emerald-500 hover:shadow-xl hover:shadow-gray-200"
            >
              <span>Create Account</span>
            </button>

            {/* Person Image Area [Login]*/}
            <button
              className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 bg-transparent"
              onClick={() =>
                navigate("/signin", {
                  state: { backgroundLocation: location },
                })
              }
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gray-200`}
              >
                <HugeiconsIcon
                  icon={User02Icon}
                  size={24}
                  className="text-gray-700"
                  strokeWidth={2}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 z-100 flex w-full min-w-sm items-center justify-evenly bg-white shadow-[0_-1px_0px_rgba(0,0,0,0.05)] lg:hidden">
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
