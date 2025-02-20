import LoginForm from "@/components/forms/login/login";
import LoginSignUpSideBar from "@/components/ui/LoginSignUpSideBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp - TeamFirstHR",
};

export default function Login() {
  return (
    <main className="h-screen w-screen flex flex-row justify-center items-center gap-[5rem] px-spacing-xl">
      <LoginForm></LoginForm>
      <LoginSignUpSideBar></LoginSignUpSideBar>
    </main>
  );
}
