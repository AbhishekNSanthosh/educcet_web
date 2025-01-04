"use client";
import React, { useState } from "react";

interface Syllabus {
  moduleName: string;
  cos: string;
}

interface SchemeData {
  schemeName: string;
  year: number;
  groupName: string;
  branchName: string;
  semester: string;
  courseName: string;
  courseNumber: string;
  slot: string;
  ltp: string;
  hours: string;
  syllabus: Syllabus[];
  credits: string;
  totalHours: string;
  totalCredits: string;
}

export default function DataEntryPage() {
  const [schemeData, setSchemeData] = useState<SchemeData>({
    schemeName: "",
    year: new Date().getFullYear(),
    groupName: "",
    branchName: "",
    semester: "",
    courseName: "",
    courseNumber: "",
    slot: "",
    ltp: "",
    hours: "",
    credits: "",
    syllabus: [{ moduleName: "", cos: "" }],
    totalHours: "",
    totalCredits: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      const updatedSyllabus = [...schemeData.syllabus];
      updatedSyllabus[index][name as keyof Syllabus] = value; // Correctly cast `name` to keyof Syllabus
      setSchemeData((prevData) => ({
        ...prevData,
        syllabus: updatedSyllabus,
      }));
    } else {
      setSchemeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSchemeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addSyllabusModule = () => {
    setSchemeData((prevData) => ({
      ...prevData,
      syllabus: [...prevData.syllabus, { moduleName: "", cos: "" }],
    }));
  };

  const removeSyllabusModule = (index: number) => {
    const updatedSyllabus = schemeData.syllabus.filter((_, i) => i !== index);
    setSchemeData((prevData) => ({
      ...prevData,
      syllabus: updatedSyllabus,
    }));
  };

  console.log(schemeData);

  return (
    <div className="min-h-screen flex flex-col px-[5vw] py-[2rem] items-center justify-start">
      <div className="flex flex-col items-start justify-center w-[50vw] space-y-4">
        <div className="flex items-center justify-center w-full">
          Scheme Data Entry
        </div>
        <div className="flex flex-col border border-gray-200 w-full p-5 rounded-lg mt-5">
          <div className="flex flex-col space-y-5">
            <div className="flex space-x-4">
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Scheme Name</span>
                <input
                  type="text"
                  name="schemeName"
                  value={schemeData.schemeName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Year</span>
                <input
                  type="text"
                  name="year"
                  value={schemeData.year}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div>
            </div>
            <div>
              <label htmlFor="group" className="block text-sm text-gray-800">
                Group Name
                <span className="text-[11px]">
                  (If 2024 scheme, kindly enter the group else leave it blank)
                </span>
              </label>
              <select
                name="groupName"
                id="group"
                value={schemeData.groupName}
                onChange={handleSelectChange}
                className="border border-gray-300 rounded px-2 py-2 outline-none w-full text-gray-800"
              >
                <option value="Group A">Group A</option>
                <option value="Group B">Group B</option>
                <option value="Group C">Group C</option>
                <option value="Group D">Group D</option>
              </select>
            </div>
            <div>
              <label htmlFor="branch" className="block text-sm text-gray-800">
                Branch Name
              </label>
              <select
                name="branchName"
                id="branch"
                value={schemeData.branchName}
                onChange={handleSelectChange}
                className="border border-gray-300 rounded px-2 py-2 outline-none w-full text-gray-800"
              >
                <option value="Branch A">Branch A</option>
                <option value="Branch B">Branch B</option>
                <option value="Branch C">Branch C</option>
                <option value="Branch D">Branch D</option>
              </select>
            </div>
            <div>
              <label htmlFor="semester" className="block text-sm text-gray-800">
                Choose Semester
              </label>
              <select
                name="semester"
                id="semester"
                value={schemeData.semester}
                onChange={handleSelectChange}
                className="border border-gray-300 rounded px-2 py-2 outline-none w-full text-gray-800"
              >
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Course Name</span>
                <input
                  type="text"
                  name="courseName"
                  value={schemeData.courseName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Course Number</span>
                <input
                  type="text"
                  name="courseNumber"
                  value={schemeData.courseNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Slot</span>
                <input
                  type="text"
                  name="slot"
                  value={schemeData.slot}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">LTP</span>
                <input
                  type="text"
                  name="ltp"
                  value={schemeData.ltp}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Hours</span>
                <input
                  type="text"
                  name="hours"
                  value={schemeData.hours}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Credits</span>
                <input
                  type="text"
                  name="credits"
                  value={schemeData.credits}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div>
            </div>

            {/* Syllabus Section */}
            <div className="flex flex-col space-y-4 mt-5 w-full">
              {schemeData.syllabus.map((syllabus, index) => (
                <div
                  key={index}
                  className="flex space-x-2 items-start w-full"
                >
                  <div className="flex flex-col space-y-2 w-full">
                    <div className="flex flex-1 flex-col w-full">
                      <span className="text-sm text-gray-800">Module Name</span>
                      <input
                        type="text"
                        name="moduleName"
                        value={syllabus.moduleName}
                        onChange={(e) => handleInputChange(e, index)}
                        className="border border-gray-300 rounded-lg outline-none p-3"
                      />
                    </div>
                    <div className="flex flex-1 flex-col w-full">
                      <span className="text-sm text-gray-800">COs</span>
                      <textarea
                      rows={5}
                        name="cos"
                        value={syllabus.cos}
                        onChange={(e) => handleInputChange(e, index)}
                        className="border border-gray-300 rounded-lg outline-none p-3"
                      />
                    </div>
                  </div>
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => removeSyllabusModule(index)}
                      className="mt-6 px-4 py-2 bg-white border border-slk-regular text-black-100 rounded-md"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSyllabusModule}
                className="mt-4 px-4 py-2 bg-azure-500 text-2xl font-semibold text-white rounded-md w-[5rem]"
              >
                +
              </button>
            </div>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <div className="">
              <button className="capitalize w-full bg-azure-600 rounded-lg border-none outline-none py-3 text-white">
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
