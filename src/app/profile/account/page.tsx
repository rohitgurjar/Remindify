"use client";

import React from "react";
import AccountForm from "./account-form";

type ProfileData = {
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
  gender: string;
  mobileNo: string | null;
  firstReminder: number;
  secondReminder: number;
  isNewsAndOffers: boolean | null;
  anniversaryDate: string;
};

type NotificationProps = {
  token: string;
  profileData: ProfileData;
};

const Account: React.FC<NotificationProps> = ({ profileData, token }) => {
  return (
    <div>
      <AccountForm userData={profileData} token={token} />
    </div>
  );
};

export default Account;
