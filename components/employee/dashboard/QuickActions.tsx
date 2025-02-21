"use client";
import Button from "@/components/ui/Button";
import React, { useState } from "react";

const EmployeeQuickActions = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInTime, setSignInTime] = useState<string | null>(null);
  const [signOutTime, setSignOutTime] = useState<string | null>(null);

  const handleSignIn = () => {
    const currentTime = new Date().toLocaleString();
    setSignInTime(currentTime);
    setIsSignedIn(true);
    setSignOutTime(null);
  };

  const handleSignOut = () => {
    const currentTime = new Date().toLocaleString();
    setSignOutTime(currentTime);
    setIsSignedIn(false);
  };

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-spacing-l">
      <div className="h-[150px] bg-yellow-400 rounded-lg flex flex-col justify-start items-start gap-spacing-xxs p-spacing-s">
        <Button onClick={handleSignIn} disabled={isSignedIn}>
          Sign In
        </Button>
        {signInTime && <h5>Signed In at: {signInTime}</h5>}
      </div>
      <div className="h-[150px] bg-yellow-400 rounded-lg flex flex-col justify-start items-start gap-spacing-xxs p-spacing-s">
        <Button onClick={handleSignOut} disabled={!isSignedIn}>
          Sign Out
        </Button>
        {signOutTime && <h5>Signed Out at: {signOutTime}</h5>}
      </div>

      <div className="lg:col-span-2 h-[150px] bg-yellow-400 rounded-lg flex flex-col justify-start items-start gap-spacing-xxs p-spacing-s">
        <Button>Apply for a leave</Button>
      </div>
    </section>
  );
};

export default EmployeeQuickActions;
