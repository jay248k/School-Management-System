import React from "react";

/* ================= Dummy Data ================= */
const dummyStudents = [
  {
    student_id: 2717,
    rollno: "1",
    first_name: "Adam",
    last_name: "Savage",
    father_name: "Bill Savage",
    gender: "M",
    mobile: "9000100015",
    status: "Active",
    class_name: "1st",
    section: "A",
  },
  {
    student_id: 1093,
    rollno: "2",
    first_name: "Aiden",
    last_name: "Pearce",
    father_name: "Mark Pearce",
    gender: "M",
    mobile: "9000100025",
    status: "Active",
    class_name: "1st",
    section: "A",
  },
];

/* ================= Component ================= */
const StudentList = () => {
  const handleView = (student) => {
    console.log({
      rollno: student.rollno,
      class_name: student.class_name,
      section: student.section,
      sid: student.student_id,
    });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Students</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2">Roll No</th>
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Mobile</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {dummyStudents.map((student) => (
              <tr key={student.student_id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 font-medium">
                  {student.rollno}
                </td>

                {/* Combined Name Row */}
                <td className="border px-4 py-2">
                  <p className="font-semibold text-gray-800">
                    {student.first_name} {student.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Father: {student.father_name}
                  </p>
                </td>

                <td className="border px-4 py-2">{student.mobile}</td>

                <td className="border px-4 py-2">
                  {student.gender === "M" ? "Male" : "Female"}
                </td>

                <td className="border px-4 py-2">
                  <span className="text-green-600 font-semibold">
                    {student.status}
                  </span>
                </td>

                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleView(student)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
