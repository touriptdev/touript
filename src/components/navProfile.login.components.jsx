import { HugeiconsIcon } from "@hugeicons/react";
import { User02Icon } from "@hugeicons/core-free-icons";

function NavProfileNotLogin() {
  return (
    <div className="flex items-center justify-end gap-8 font-poppins text-base font-medium text-gray-700 h-14">
        {/* Create Account [Sign Up] */}
      <a href="#">
        <div className="flex items-center h-full py-4 gap-2 hover:text-emerald-500 border-b-2 border-transparent hover:border-emerald-500">
          <span className="">Create Account</span>
        </div>
      </a>
      {/* Person Image Area [Login]*/}
      <a href="">
        <div className="w-14 h-14 bg-transparent border-2 border-gray-200 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <HugeiconsIcon
              icon={User02Icon}
              size={24}
              className="text-gray-700"
            />
          </div>
        </div>
      </a>
    </div>
  );
}

export default NavProfileNotLogin;
