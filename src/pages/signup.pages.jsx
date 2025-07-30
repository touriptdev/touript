import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { SignUpSection, VerificationCode, AccountSetup } from "../layouts";

export default function SignUp() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");

  const handleSignUpForm = () => {
    // if (!email || !password || !confirmPassword) {
    //   alert("All fields are required");
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }
    console.log("Form submitted:", { email, password, confirmPassword });
    setStep(2);
  };

  const handleVerification = () => {
    console.log("Email Verified");
    setStep(3);
  };

  const handleAccountSetup = () => {
    console.log("Form submitted:", { firstname, lastname, username, gender });
    setStep(4);
  };

  const goBack = () => setStep((prev) => prev - 1);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <main className="flex items-center justify-center w-full">
        {step === 1 && (
          <SignUpSection
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            onNext={handleSignUpForm}
          />
        )}

        {step === 2 && (
          <VerificationCode onBack={goBack} onNext={handleVerification} />
        )}

        {step === 3 && (
          <AccountSetup
            username={username}
            setUsername={setUsername}
            gender={gender}
            firstname={firstname}
            setFirstname={setFirstname}
            lastname={lastname}
            setLastname={setLastname}
            setGender={setGender}
            onBack={goBack}
            onNext={handleAccountSetup}
          />
        )}
      </main>
    </div>
  );
}
