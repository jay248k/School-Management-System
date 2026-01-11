import React, { useState } from "react";

// Dummy class info
const classInfo = {
  className: "6th",
  section: "A",
};

// Dummy students data
const dummyStudents = [
  {
    rollNo: 1,
    first_name: "Rahul",
    last_name: "Sharma",
    father_name: "Mahesh Sharma",
    mobile_number: "9876543210",
    gender: "Male",
    dob: "2013-05-12",
  },
  {
    rollNo: 2,
    first_name: "Anjali",
    last_name: "Patel",
    father_name: "Ramesh Patel",
    mobile_number: "9876501234",
    gender: "Female",
    dob: "2013-08-20",
  },
  {
    rollNo: 3,
    first_name: "Aman",
    last_name: "Verma",
    father_name: "Suresh Verma",
    mobile_number: "9898989898",
    gender: "Male",
    dob: "2013-01-15",
  },
  // add more if needed
];

const MyClass = () => {
  const [rollFilter, setRollFilter] = useState("");

  const filteredStudents = dummyStudents.filter((student) =>
    rollFilter ? student.rollNo.toString().includes(rollFilter) : true
  );

  const handleView = (student) => {
    console.log("View Student:", student);
    alert(`Viewing details for Roll No ${student.rollNo}`);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Class</h2>
        <p className="text-gray-600 mt-1">
          Class: <strong>{classInfo.className}</strong> | Section:{" "}
          <strong>{classInfo.section}</strong>
        </p>
      </div>

      {/* Table Header with Filter */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">Student List</h3>

        <input
          type="text"
          placeholder="Filter by Roll No"
          value={rollFilter}
          onChange={(e) => setRollFilter(e.target.value)}
          className="border rounded px-3 py-2 w-48"
        />
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Roll No</th>
              <th className="border px-3 py-2 text-left">Student Name</th>
              <th className="border px-3 py-2 text-left">Father Name</th>
              <th className="border px-3 py-2 text-left">Mobile</th>
              <th className="border px-3 py-2 text-left">Gender</th>
              <th className="border px-3 py-2 text-left">DOB</th>
              <th className="border px-3 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.rollNo} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{student.rollNo}</td>
                  <td className="border px-3 py-2">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="border px-3 py-2">{student.father_name}</td>
                  <td className="border px-3 py-2">{student.mobile_number}</td>
                  <td className="border px-3 py-2">{student.gender}</td>
                  <td className="border px-3 py-2">{student.dob}</td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() => handleView(student)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClass;
