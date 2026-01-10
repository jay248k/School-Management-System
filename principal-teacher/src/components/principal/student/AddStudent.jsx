import React, { useState } from "react";
import { registerStudentAPI } from "../../../services/admin.api";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    gender: "M",
    dob: "",
    mobile: "",
    address: "",
    admission_date: "",
    status: "active",
    class_number: "",
    password: "",
  });

  const classes = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return; // allow only digits
      if (value.length > 10) return; // max 10 digits
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
      return;
    }

    const res = await registerStudentAPI(formData);

    if (res) {
      setFormData({
        first_name: "",
        last_name: "",
        father_name: "",
        gender: "M",
        dob: "",
        mobile: "",
        address: "",
        admission_date: "",
        status: "active",
        class_number: "",
        password: "",
      });
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClass = "text-base font-medium text-gray-700";

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Add New Student
      </h2>
      <p className="text-base text-gray-500 mb-8">
        Fill in the student details carefully
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Section */}
        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Father Name</label>
            <input
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Gender & DOB */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Mobile & Address */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Mobile Number</label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <p className="text-sm text-gray-400 mt-1">
              Enter 10 digit mobile number
            </p>
          </div>

          <div>
            <label className={labelClass}>Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Admission Date & Status */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Admission Date</label>
            <input
              type="date"
              name="admission_date"
              value={formData.admission_date}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Class & Password */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Class</label>
            <select
              name="class_number"
              value={formData.class_number}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-12 py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition"
          >
            Save Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
