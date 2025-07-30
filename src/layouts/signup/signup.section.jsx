import { Link } from "react-router-dom";
import { EmailInput, PasswordInput } from "../../components/forms";
import { ModalHeader } from "../../layouts";
import { useNavigate } from "react-router-dom";

export default function SignUpSection({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onNext,
}) {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Header */}
      <ModalHeader title="touript" />

      {/* Title*/}
      <div className="flex flex-col items-center justify-center font-poppins text-center text-gray-900 gap-2 py-8">
        <h3 className="font-semibold text-4xl">Sign Up</h3>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-500 text-lg lg:text-base">
            Already have an account?
          </span>
          <button
            className="underline text-gray-700 font-medium cursor-pointer text-lg lg:text-base hover:text-gray-900 transition-all duration-300 delay-150"
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
      <div className="flex flex-col items-center justify-center font-poppins text-center text-gray-900 gap-2 pb-8 w-full font-poppins font-medium">
        <button className="w-full h-14 flex items-center justify-bewteen px-4 bg-gray-50 border-1 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 delay-150 hover:bg-white hover:shadow-lg shadow-gray-200 hover:border-transparent">
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src="/images/google.png"
              alt="Google Logo"
              className="cover-fit"
            />
          </div>
          <span className="flex-1 text-center text-lg lg:text-base">
            Sign Up With Google
          </span>
        </button>

        <button className="w-full h-14 flex items-center justify-bewteen px-4 bg-gray-50 border-1 border-gray-200 rounded-lg cursor-pointer transition-all duration-300 delay-150 hover:bg-white hover:shadow-lg shadow-gray-200 hover:border-transparent">
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src="/images/facebook.png"
              alt="Facebook Logo"
              className="cover-fit"
            />
          </div>
          <span className="flex-1 text-center text-lg lg:text-base">
            Sign Up With Facebook
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center text-center font-poppins w-full gap-2">
        <div className="h-px w-full bg-gray-200"></div>
        <span className="text-sm text-gray-400">Or</span>
        <div className="h-px w-full bg-gray-200"></div>
      </div>

      {/* Form */}
      <main className="flex flex-col items-center font-poppins text-lg lg:text-base w-full gap-2 py-8">
        <div className="flex items-center justify-start w-full pb-4">
          <span className="font-medium">Sign up with Email</span>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            label="password"
            placeholderText="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="confirmPassword"
            placeholderText="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-emerald-500 flex items-center justify-center w-full h-14 mt-8 rounded-lg text-center text-white font-poppins font-medium cursor-pointer"
          >
            <span>Continue</span>
          </button>
        </form>

        {/* Terms & Conditions */}
        <div className="flex items-center justify-center gap-1 text-xs mt-4">
          <span className="text-gray-500 ">By continuing, you accept our</span>
          <Link
            to="/termscondition"
            className="underline text-gray-700 font-medium cursor-pointer hover:text-gray-900 transition-all duration-300 delay-150"
          >
            Terms
          </Link>
          <span>&</span>

          <Link
            to="/privacypolicy"
            className="underline text-gray-700 font-medium cursor-pointer hover:text-gray-900 transition-all duration-300 delay-150"
          >
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  );
}
