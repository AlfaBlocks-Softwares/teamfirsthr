/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthComponent(props: any) {
    const router = useRouter();
    const isAuthenticated = false;
    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
