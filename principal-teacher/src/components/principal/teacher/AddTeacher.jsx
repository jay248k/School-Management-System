import React, { useState } from "react";
import { addTeacherAPI } from "../../../services/teacher.api";

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    qualification: "",
    joining_date: "",
    password: "",
  });

  const [mobileError, setMobileError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;

      if (value.length > 10) return;

      setMobileError(
        value.length > 0 && value.length < 10
          ? "Mobile number must be 10 digits"
          : ""
      );
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits");
      return;
    }

    console.log("Teacher Data:", formData);
    const res = await addTeacherAPI(formData);
    if (res) {
      alert("Done");
    } else {
      alert("chhi chhi ");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 bg-gray-100">
      <div className="w-full bg-white rounded-lg border shadow-sm">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Add Teacher</h1>
          <p className="text-sm text-gray-500 mt-1">
            Provide teacher and account information
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Teacher full name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={`w-full border rounded-md px-3 py-2 focus:ring-2 outline-none ${
                mobileError
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
            />
            {mobileError && (
              <p className="text-xs text-red-500 mt-1">{mobileError}</p>
            )}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Highest qualification"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Joining Date
            </label>
            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create secure password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Action */}
          <div className="md:col-span-2 flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Save Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacher;
