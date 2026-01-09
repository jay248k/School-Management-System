import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "../../services/admin.api";
import { teacherLoginAPI } from "../../services/teacher.api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
    role: "teacher",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = null;

    if (form.role === "teacher") {
      res = await teacherLoginAPI({
        email: form.identifier,
        password: form.password,
      });

      if (res) {
        navigate("/teacher");
      }
    } else {
      res = await adminLoginAPI({
        userName: form.identifier,
        password: form.password,
      });

      if (res) {
        navigate("/principal");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="teacher">Teacher</option>
              <option value="principal">Principal</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              {form.role === "teacher" ? "Email" : "Username"}
            </label>
            <input
              type={form.role === "teacher" ? "email" : "text"}
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              placeholder={
                form.role === "teacher"
                  ? "Enter your email"
                  : "Enter your username"
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
