import SignUpForm from "@/components/forms/signup/signup";
import LoginSignUpSideBar from "@/components/ui/LoginSignUpSideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp - TeamFirstHR",
};

export default function SignUp() {
  return (
    <main className="h-screen w-screen flex flex-row justify-center items-center gap-[100px]">
      <SignUpForm></SignUpForm>
      <LoginSignUpSideBar></LoginSignUpSideBar>
    </main>
  );
}
