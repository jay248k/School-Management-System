import React, { useState, useRef } from "react";
import { teacherFetchClassAPI } from "../../../services/class.api";

const classOptions = [
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

const sectionOptions = ["A", "B", "C", "D"];

const TakeAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [students, setStudents] = useState([]);
  const [presentRolls, setPresentRolls] = useState([]);

  const [hoverStudent, setHoverStudent] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const hoverTimer = useRef(null);

  /* ================= Fetch Students ================= */
  const handleGetDetails = async () => {
    if (!selectedClass || !selectedSection || !selectedDate) {
      alert("Please select class, section and date");
      return;
    }

    const res = await teacherFetchClassAPI(selectedClass, selectedSection);
    setStudents(res || []);
    setPresentRolls([]);
  };

  /* ================= Toggle Attendance ================= */
  const toggleAttendance = (rollNo) => {
    setPresentRolls((prev) =>
      prev.includes(rollNo)
        ? prev.filter((r) => r !== rollNo)
        : [...prev, rollNo]
    );
  };

  /* ================= Tooltip Logic ================= */
  const handleMouseEnter = (student) => {
    setHoveredId(student.student_id);

    hoverTimer.current = setTimeout(() => {
      setHoverStudent(student);
    }, 3000);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setHoverStudent(null);
    setHoveredId(null);
  };

  /* ================= Submit ================= */
  const handleSubmit = () => {
    const payload = {
      class: selectedClass,
      section: selectedSection,
      date: selectedDate,
      presentRollNumbers: presentRolls,
    };

    console.log("Attendance Payload:", payload);
    alert("Attendance submitted successfully");
  };

  return (
    <div className="max-w-[1400px] mx-auto bg-white p-8 rounded-xl shadow">
      {/* ================= Header ================= */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Take Attendance
      </h2>

      {/* ================= NOTE ================= */}
      <p className="text-sm text-blue-600 mb-6">
        ✔ Check only <span className="font-semibold">PRESENT</span> students
      </p>

      {/* ================= Filters ================= */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded px-4 py-2 min-w-[160px]"
        >
          <option value="">Class</option>
          {classOptions.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="border rounded px-4 py-2 min-w-[120px]"
        >
          <option value="">Section</option>
          {sectionOptions.map((sec) => (
            <option key={sec} value={sec}>
              {sec}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-4 py-2"
        />

        <button
          onClick={handleGetDetails}
          className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700"
        >
          Get Students
        </button>
      </div>

      {/* ================= Attendance Grid ================= */}
      {students.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-y-4">
            {students.map((student, index) => {
              const rollNo = index + 1;
              const isPresent = presentRolls.includes(rollNo);

              return (
                <div
                  key={student.student_id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(student)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* ROW CLICKABLE */}
                  <div
                    onClick={() => toggleAttendance(rollNo)}
                    className={`flex items-center gap-3 cursor-pointer select-none ${
                      isPresent ? "text-green-700" : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isPresent}
                      readOnly
                      className="w-5 h-5 pointer-events-none"
                    />
                    <span className="font-medium">{rollNo}</span>
                  </div>

                  {/* Tooltip */}
                  {hoverStudent &&
                    hoveredId === student.student_id &&
                    hoverStudent.student_id === student.student_id && (
                      <div className="absolute z-20 top-8 left-6 bg-gray-900 text-white text-xs rounded-lg p-3 w-56 shadow-xl">
                        <p className="font-semibold text-sm mb-1">
                          {student.first_name} {student.last_name}
                        </p>
                        <p>
                          Gender: {student.gender === "M" ? "Male" : "Female"}
                        </p>
                        <p>DOB: {new Date(student.dob).toLocaleDateString()}</p>
                      </div>
                    )}
                </div>
              );
            })}
          </div>

          {/* ================= Submit ================= */}
          <div className="flex justify-between items-center mt-10">
            <p className="text-sm text-gray-600">
              Present:{" "}
              <span className="font-semibold text-green-600">
                {presentRolls.length}
              </span>
            </p>

            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-12 py-3 rounded-lg hover:bg-green-700"
            >
              Submit Attendance
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TakeAttendance;
