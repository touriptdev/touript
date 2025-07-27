import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";
import { Link } from "react-router-dom";
import { CheckboxInput, EmailInput, EnterCode, PasswordInput } from "../components/forms";
// import { useState } from "react";

export default function VerificationCode() {
//   const location = useLocation();
//   const navigate = useNavigate();


  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Header*/}
      <div className="flex items-center justify-between w-full relative border-b-1 border-gray-200 pb-4">
        {/* Close Button */}
        <button className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 delay-150 hover:bg-gray-50 cursor-pointer">
          <HugeiconsIcon
            icon={CancelCircleIcon}
            size={24}
            className="text-gray-700 hover:text-gray-900"
            strokeWidth={2}
          />
        </button>
        {/* heading of section */}
        <h5 className="absolute left-1/2 my-auto -translate-x-1/2 flex-1 text-center font-medium text-lg lg:text-xl text-gray-900 font-poppins">
          touript
        </h5>
      </div>

      {/* Title*/}
      <main className="flex flex-col items-center justify-center font-poppins text-center text-gray-900 gap-2 py-8">
        <h3 className="font-semibold text-4xl">Verification Code</h3>
        <div className="font-normal text-gray-500 text-lg lg:text-base leading-[1.7]">
            A verification code has been sent to the email address. Please enter the code below to proceed.
        </div>
        <EnterCode />
        <div className="flex items-center justify-between w-full h-14">
            <span>Didn't receive the code?</span>
            <Link to="/forgetPassword" className="flex items-end gap-2">
              <span className="underline text-md font-poppins font-medium text-gray-700 cursor-pointer">
                Resend
              </span>
              <span className="text-md text-gray-400 text-end w-12">3:00</span>
            </Link>
          </div>
          <button
            type="submit"
            className="bg-emerald-500 flex items-center justify-center w-full h-14 mt-8 rounded-lg text-center text-white font-poppins font-medium cursor-pointer"
          >
            <span>Continue</span>
          </button>
      </main>
    </div>
  );
}
