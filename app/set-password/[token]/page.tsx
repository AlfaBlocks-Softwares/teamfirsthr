import SetUpPasswordForm from "@/components/forms/setpassword/setpassword";
import LoginSignUpSideBar from "@/components/ui/LoginSignUpSideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set Password - TeamFirstHR",
};

export default function Login() {
  return (
    <main className="h-screen w-screen flex flex-row justify-center items-center gap-[5rem] px-spacing-xl">
      <SetUpPasswordForm />
      <LoginSignUpSideBar></LoginSignUpSideBar>
    </main>
  );
}
