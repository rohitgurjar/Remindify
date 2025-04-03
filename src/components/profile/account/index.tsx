"use client";

import React from "react";
import AccountForm from "./account-form";

interface ProfileData {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  isLocked: boolean;
  isActivated: boolean;
  dateLastLoggedIn: string;
  dateCurrentLoggedIn: string;
  isActive: boolean;
  ageSecret: boolean;
  birthDate: string;
  gender: "Male" | "Female" | "Other";
  mobileNo: null;
  firstReminder: number;
  secondReminder: number;
  isNewsAndOffers: null;
  anniversaryDate: string;
}

export type AccountProp = {
  userData: ProfileData;
  token: string;
};

const Account: React.FC<AccountProp> = ({ userData, token }) => {
  console.log("profileData_profileData", userData);

  return (
    <div>
      <AccountForm userData={userData} token={token} />
    </div>
  );
};

export default Account;
