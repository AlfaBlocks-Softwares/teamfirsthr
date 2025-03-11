"use client";
import { selectUser } from "@/redux/selectors";
import { Typography } from "antd";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import defaultProfile from "@/public/profile.png";

interface Props {
  collapsed: boolean;
}

const UserProfileCard: React.FC<Props> = ({ collapsed }) => {
  const user = useSelector(selectUser);

  return (
    <div
      className="
    mt-spacing-xl
    p-spacing-l
    flex 
    justify-start 
    items-start 
    gap-spacing-s"
    >
      <Image
        src={user?.profile_picture || defaultProfile}
        alt="profile_pic"
        className="
        h-[56px]
        w-[56px]
        object-contain
        rounded-[50%]
      "
      ></Image>
      {!collapsed && (
        <div
          className="
      flex 
      flex-col 
      justify-start 
      items-start 
      gap-spacing-xxxs"
        >
          <Typography.Title className="!p-0 !m-0 !text-lg !text-white">
            {user?.first_name ?? ""}
          </Typography.Title>
          <Typography.Title className="!p-0 !m-0 !text-sm  !text-white">
            {user?.role ?? ""}
          </Typography.Title>
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
