import React, { useState } from "react";

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

// 60 dummy roll numbers
const dummyRollNumbers = Array.from({ length: 60 }, (_, i) => i + 1);

const TakeAttendance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [rollNumbers, setRollNumbers] = useState([]);
  const [presentRolls, setPresentRolls] = useState([]);

  const handleGetDetails = () => {
    if (!selectedClass || !selectedSection || !selectedDate) {
      alert("Please select class, section and date");
      return;
    }
    setRollNumbers(dummyRollNumbers);
    setPresentRolls([]);
  };

  const toggleAttendance = (roll) => {
    setPresentRolls((prev) =>
      prev.includes(roll) ? prev.filter((r) => r !== roll) : [...prev, roll]
    );
  };

  const handleSubmit = () => {
    const payload = {
      class: selectedClass,
      section: selectedSection,
      date: selectedDate,
      presentRollNumbers: presentRolls,
    };

    console.log("Attendance Data:", payload);
    alert("Attendance submitted successfully");
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Take Attendance
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded px-4 py-2"
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
          className="border rounded px-4 py-2"
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
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Get Students
        </button>
      </div>

      {/* Attendance Rows */}
      {rollNumbers.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-3">
            {rollNumbers.map((roll) => (
              <label
                key={roll}
                className="flex items-center gap-3 text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={presentRolls.includes(roll)}
                  onChange={() => toggleAttendance(roll)}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">{roll}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-10 py-3 rounded hover:bg-green-700"
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
