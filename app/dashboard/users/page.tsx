import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

const UsersTable = dynamic(() => import("@/components/hr/users/UsersTable"));

export const metadata: Metadata = {
  title: "Users - TeamFirstHR",
};

export default function SignUp() {
  return <UsersTable />;
}
