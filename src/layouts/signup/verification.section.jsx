import { EnterCode } from "../../components/forms";
import { ModalHeader } from "../../layouts";

export default function VerificationCode({ onBack, onNext }) {
  const sendEmailCode = () => {
    console.log("Email has been sent");
  };

  const handleVerification = () => {
    console.log("Email has been sent");
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Header*/}
      <ModalHeader title="touript" />

      {/* Title + Form */}
      <main className="flex flex-col items-center justify-center font-poppins text-center text-gray-900 gap-2 py-8">
        <h3 className="font-semibold text-4xl">Verification Code</h3>
        <div className="font-normal text-gray-500 text-lg lg:text-base leading-[1.7]">
          A verification code has been sent to the email address. Please enter
          the code below to proceed.
        </div>

        {/* Form */}
        <EnterCode />

        <div className="flex items-center justify-between w-full h-14">
          <span>Didn't receive the code?</span>
          <button onClick={sendEmailCode} className="flex items-end gap-2">
            <span className="underline text-md font-poppins font-medium text-gray-700 cursor-pointer">
              Resend
            </span>
            <span className="text-md text-gray-400 text-end w-12">3:00</span>
          </button>
        </div>

        <div className="flex items-center justify-between w-full gap-4">
          <button
            onClick={onBack}
            className="bg-gray-200 flex items-center justify-center w-full h-14 mt-8 rounded-lg text-center text-white font-poppins font-medium cursor-pointer"
          >
            <span className="text-gray-900">Back</span>
          </button>
          <button
            onClick={handleVerification}
            className="bg-emerald-500 flex items-center justify-center w-full h-14 mt-8 rounded-lg text-center text-white font-poppins font-medium cursor-pointer"
          >
            <span>Continue</span>
          </button>
        </div>
      </main>
    </div>
  );
}
