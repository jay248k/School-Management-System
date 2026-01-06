import React, { useState } from "react";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    surname: "",
    father_name: "",
    gender: "M",
    dob: "",
    mobile: "",
    address: "",
    admission_date: "",
    status: "Active",
    class_id: "",
    division: "A",
    password: "",
  });

  const classes = [
    "Nursery",
    "Pre-K",
    "Kindergarten",
    ...Array.from({ length: 12 }, (_, i) => `${i + 1} Grade`),
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile: only digits & max 10
    if (name === "mobile") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    console.log("Student Data:", formData);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Add New Student
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-lg">
        {/* Name Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Surname</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Father Name</label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* Gender & DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* Mobile & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10 digit mobile number"
              required
              className="w-full border rounded-lg px-4 py-3"
            />
            <p className="text-sm text-gray-500 mt-1">
              Mobile number must be 10 digits
            </p>
          </div>
          <div>
            <label className="block mb-2 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>

        {/* Admission & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Admission Date</label>
            <input
              type="date"
              name="admission_date"
              value={formData.admission_date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Class & Division */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Class</label>
            <select
              name="class_id"
              value={formData.class_id}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
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
            <label className="block mb-2 font-medium">Division</label>
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Submit */}
        <div className="pt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white text-lg px-12 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Save Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
