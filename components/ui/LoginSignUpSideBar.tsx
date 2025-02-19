"use client";
import { Typography } from "antd";
// import Image from "next/image";

export default function LoginSignUpSideBar() {
  return (
    <section className="w-[600px] h-[70vh] bg-primary flex flex-col justify-start items-center gap-spacing-l rounded-2xl">
      <Typography.Title
        level={3}
        className="mt-spacing-xxl !text-secondary text-wrap text-center"
      >
        The fastest transaction process only here
      </Typography.Title>
      {/* <Image src={""} alt="login_signup"></Image> */}
    </section>
  );
}
