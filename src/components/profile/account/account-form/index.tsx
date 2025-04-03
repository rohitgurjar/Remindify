"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "@/components/FormInput";
import DateDropdown from "@/components/date-picker";
import { showToast } from "@/components/toaster";
import { AccountProp } from "..";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

interface Accountprops {
  firstName: string;
  lastName: string;
  ageSecret: boolean;
}

const AccountForm: React.FC<AccountProp> = ({ userData, token }) => {
  const [selectedBday, setSelectedBday] = React.useState<string>("");
  const [selectedAnnivarsary, setSelectedAnnivarsary] =
    React.useState<string>("");

  React.useEffect(() => {
    if (userData) {
      setSelectedBday(userData.birthDate);
      setSelectedAnnivarsary(userData.anniversaryDate);
    } else {
      setSelectedBday(selectedBday);
      setSelectedAnnivarsary(selectedAnnivarsary);
    }
  }, []);

  const initialvalue: Accountprops = {
    firstName: userData?.firstName ?? "",
    lastName: userData?.lastName ?? "",
    ageSecret: userData?.ageSecret ?? false,
  };

  const formik = useFormik({
    initialValues: initialvalue,
    validationSchema,
    onSubmit: async (values) => {
      const response = await fetch(
        "http://172.16.1.130/api/v1/Account/UpdateProfile",
        {
          method: "POST",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.userId,
            firstName: values.firstName,
            lastName: values.lastName,
            birthDate: selectedBday,
            keepMyAgeSecret: values.ageSecret,
            anniversaryDate: selectedAnnivarsary,
            // moreInformation: "string",
          }),
        }
      );

      if (response.status === 200) {
        showToast("User Profile  Updated successfully", "success");
      }

      if (response.status === 400) {
        showToast("User Profile not Updated", "error");
      }
    },
  });

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className="flex flex-col text-black mt-10 items-center  max-w-xl mx-10 relative">
        <h1 className="text-4xl text-gray-800 mb-5 font-bold">
          Account Settings
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-3 mb-4">
            <FormInput
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              error={formik.errors.firstName}
              touched={formik.touched.firstName}
              required
            />

            <FormInput
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              error={formik.errors.lastName}
              touched={formik.touched.lastName}
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <div className="flex gap-3 w-full">
              <div>
                <DateDropdown
                  label="Birthday"
                  onChange={setSelectedBday}
                  setSelectedDate={setSelectedBday}
                  selectedDate={selectedBday}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              id="ageSecret"
              name="ageSecret"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.ageSecret} // ✅ Use checked instead of value
            />
            <label
              htmlFor="ageSecret"
              className="text-gray-700 text-sm font-medium"
            >
              Keep my age secret
            </label>
          </div>

          <div className="border w-full mb-4"></div>

          <div className="flex flex-col mb-4">
            <div className="flex gap-3 w-full">
              <div>
                <DateDropdown
                  label="Anniversary"
                  onChange={setSelectedAnnivarsary}
                  setSelectedDate={setSelectedAnnivarsary}
                  selectedDate={selectedAnnivarsary}
                />
              </div>
            </div>
          </div>

          {/* <div className="border w-full mb-4"></div>

          <div className="flex gap-3 mb-10 w-full">
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-1/2 h-10 "
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div> */}

          <button
            type="submit"
            className="bg-green-400 py-3 px-8 rounded-3xl text-white font-bold mt-4 w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
