import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

const CreateNewUserForm = dynamic(
  () => import("@/components/forms/createnewuser/createnewuser")
);

export const metadata: Metadata = {
  title: "Create New User - TeamFirstHR",
};

export default function SignUp() {
  return (
    <main className="h-full w-full flex flex-row justify-start items-start">
      <CreateNewUserForm />
    </main>
  );
}
