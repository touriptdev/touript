import {
  Appointment01Icon,
  UserMultiple03Icon,
  CheckListIcon,
  User02Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons";
import ButtonWithBorder from "./buttons/buttonWithBorder.components";
import IconButton from "./buttons/iconButton.components";
import { Link, useLocation } from "react-router-dom";
import TabBarButton from "./buttons/tabBarButton.components";
import { useEffect, useRef, useState } from "react";
import { navItems } from "../utils/navItems";

function HeaderLarge() {
  const location = useLocation();
  const navRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeIndex = navItems.findIndex(
      (item) => location.pathname === item.link
    );

    const current = navRefs.current[activeIndex];
    if (current) {
      setIndicatorStyle({
        left: current.offsetLeft,
        width: current.offsetWidth,
      });
    }
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
        {/* <div className="flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  font-poppins text-base text-gray-700 h-14">
          <ButtonWithBorder
            iconName={Appointment01Icon}
            iconText="Book Now"
            iconLink="/"
            useNavLink={true}
          />

          <ButtonWithBorder
            iconName={UserMultiple03Icon}
            iconText="Far Fable"
            iconLink="/farfable"
            useNavLink={true}
          />
          <ButtonWithBorder
            iconName={CheckListIcon}
            iconText="My Booking"
            iconLink="/mybooking"
            useNavLink={true}
          />
        </div> */}
        <div className="relative flex items-center gap-8 font-poppins text-base font-medium text-gray-700 h-14">
          {/* Animated Underline */}
          <div
            className="absolute bottom-0 h-0.5  bg-emerald-500 transition-all duration-300 ease-in-out"
            style={{ ...indicatorStyle }}
          />

          {/* {navItems.map((item, idx) => (
            <div
              key={item.link}
              ref={(el) => (navRefs.current[idx] = el)}
              className="relative"
            >
              <ButtonWithBorder
                iconText={item.text}
                iconName={item.icon}
                iconLink={item.link}
                useNavLink={true}
              />
            </div>
          ))} */}

          {navItems.map((item, idx) => (
            <div
              key={item.link}
              ref={(el) => {
                if (el) navRefs.current[idx] = el;
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

      <div className="lg:hidden fixed bottom-0 flex items-center justify-evenly  w-full  shadow-[0_-1px_0px_rgba(0,0,0,0.05)] bg-white z-50">
        <TabBarButton
          iconName={Appointment01Icon}
          iconText="Book Now"
          iconLink="/"
        />
        <TabBarButton
          iconName={UserMultiple03Icon}
          iconText="Far Fable"
          iconLink="/farfable"
        />
        <TabBarButton
          iconName={CheckListIcon}
          iconText="My Booking"
          iconLink="/mybooking"
        />
        <TabBarButton
          iconName={Message01Icon}
          iconText="Firesight"
          iconLink="/firesight"
        />
        <TabBarButton
          iconName={User02Icon}
          iconText="Profile"
          iconLink="/profile/:id"
        />
      </div>
    </div>
  );
}

export default HeaderLarge;
