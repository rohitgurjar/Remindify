import React, { Suspense } from "react";
import PasswordChangeForm from "@/components/PasswordChangeForm";

const PasswordChange = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordChangeForm />
    </Suspense>
  );
};

export default PasswordChange;
