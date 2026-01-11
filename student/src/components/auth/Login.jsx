import React, { useState, useCallback } from "react";
import { studentLoginAPI } from "../../services/auth.api";
import { useNavigate } from "react-router-dom";

const CLASS_OPTIONS = [
  "Nursery",
  "Pre-K",
  "Kindergarten",
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

const SECTION_OPTIONS = ["A", "B", "C", "D"];

const Login = () => {
  const naviagte = useNavigate();
  const [formData, setFormData] = useState({
    rollno: "",
    class_name: "",
    section: "",
    password: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await studentLoginAPI(formData);
    if (res) naviagte("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-slate-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Student Login
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Login with your school details
          </p>
        </div>

        {/* Roll Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Roll Number
          </label>
          <input
            type="text"
            inputMode="numeric"
            name="rollno"
            placeholder="Enter roll number"
            value={formData.rollno}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Class & Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Class
            </label>
            <select
              name="class_name"
              value={formData.class_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Class</option>
              {CLASS_OPTIONS.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Section
            </label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
              className="w-full px-3 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Section</option>
              {SECTION_OPTIONS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:scale-95 transition"
        >
          Login
        </button>
      </form>

      {/* Hide number arrows (extra safety) */}
      <style>{`
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default Login;
