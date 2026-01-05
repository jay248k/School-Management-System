import React, { useState } from "react";

const StudentRegistrationForm = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    mobile: "",
    address: "",
    admission_date: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", form);
    // API call here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="bg-white w-full max-w-4xl rounded shadow p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Student Registration
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Admission Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Admission Date
            </label>
            <input
              type="date"
              name="admission_date"
              value={form.admission_date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm text-gray-600 mb-1">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
