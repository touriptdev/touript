import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";
import { useLocation, useNavigate } from "react-router-dom";

export default function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="flex flex-col items-center justify-center font-poppins text-center text-gray-900 gap-2 py-8">
        <h3 className="font-semibold text-2xl lg:text-4xl">Sign Up</h3>
        <div className="flex items-center justify-center gap-2">
          <span>Already have an account?</span>
          <button
            className="underline text-gray-900 font-semibold cursor-pointer"
            // onClick={() => navigate("/signin")}
            onClick={() =>
              navigate("/signin", {
                state: location.state?.backgroundLocation
                  ? { backgroundLocation: location.state.backgroundLocation }
                  : {},
              })
            }
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Social*/}
      <div className="flex flex-col items-center justify-center font-poppins text-center text-gray-900 gap-2 py-8 w-full font-poppins font-medium">
        <button className="w-full h-16 flex items-center justify-bewteen px-4 bg-gray-50 border-1 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 delay-150 hover:bg-white hover:shadow-lg hover:border-transparent">
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src="/images/google.png"
              alt="Google Logo"
              className="cover-fit"
            />
          </div>
          <span className="flex-1 text-center">Sign Up With Google</span>
        </button>

        <button className="w-full h-16 flex items-center justify-bewteen px-4 bg-gray-50 border-1 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 delay-150 hover:bg-white hover:shadow-lg hover:border-transparent">
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src="/images/facebook.png"
              alt="Facebook Logo"
              className="cover-fit"
            />
          </div>
          <span className="flex-1 text-center">Sign Up With Facebook</span>
        </button>
      </div>
{/* Social*/}
<div className="flex items-center justify-center text-center font-poppins">

</div>

    </div>
  );
}
