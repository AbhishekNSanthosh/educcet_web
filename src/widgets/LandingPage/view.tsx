"use client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Syllabus {
  moduleName: string;
  moduleContent: string;
}

interface Cos {
  title: string;
  co: string;
}

interface SchemeData {
  schemeName: string;
  year: string;
  groupName: string;
  branchName: string;
  semester: string;
  courseName: string;
  courseNumber: string;
  slot: string;
  ltp: string;
  hours: string;
  syllabus: Syllabus[];
  courseOutcomes: Cos[];
  credits: string;
  totalHours: string;
  totalCredits: string;
}

export default function DataEntryPage() {
  const [schemeData, setSchemeData] = useState<SchemeData>({
    schemeName: "",
    year: "",
    groupName: "nill",
    branchName: "",
    semester: "",
    courseName: "",
    courseNumber: "",
    slot: "",
    ltp: "",
    hours: "",
    credits: "",
    syllabus: [{ moduleName: "", moduleContent: "" }],
    courseOutcomes: [{ title: "", co: "" }],
    totalHours: "",
    totalCredits: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
    field?: "syllabus" | "courseOutcomes" // Optional parameter to specify the field
  ) => {
    const { name, value } = e.target;

    if (index !== undefined && field) {
      // Handle updates for array fields (syllabus or courseOutcomes)
      const updatedField = [...(schemeData[field] as any[])]; // Clone the relevant array
      updatedField[index][name as keyof (typeof updatedField)[number]] = value; // Update the value
      setSchemeData((prevData) => ({
        ...prevData,
        [field]: updatedField,
      }));
    } else {
      // Handle updates for non-array fields
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
      syllabus: [...prevData.syllabus, { moduleName: "", moduleContent: "" }],
    }));
  };

  const addCourseOutcome = () => {
    setSchemeData((prevData) => ({
      ...prevData,
      courseOutcomes: [...prevData.courseOutcomes, { title: "", co: "" }],
    }));
  };

  const removeSyllabusModule = (index: number) => {
    const updatedSyllabus = schemeData.syllabus.filter((_, i) => i !== index);
    setSchemeData((prevData) => ({
      ...prevData,
      syllabus: updatedSyllabus,
    }));
  };

  const removeCourseOutcomes = (index: number) => {
    const updatedOutcomes = schemeData.courseOutcomes.filter(
      (_, i) => i !== index
    );
    setSchemeData((prevData) => ({
      ...prevData,
      courseOutcomes: updatedOutcomes,
    }));
  };
  ``;

  console.log(schemeData);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/courses/new", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Ensure the server knows the body is JSON
        },
        body: JSON.stringify(schemeData), // Convert the request body to JSON
      });

      const data = await response.json();

      // Handle non-OK responses
      if (!response.ok) {
        throw data;
      }
      toast.success("Submitted succesfully", {
        position: "bottom-center",
      });
      // setSchemeData({
      //   schemeName: "",
      //   year: "",
      //   groupName: "nill",
      //   branchName: "",
      //   semester: "",
      //   courseName: "",
      //   courseNumber: "",
      //   slot: "",
      //   ltp: "",
      //   hours: "",
      //   credits: "",
      //   syllabus: [{ moduleName: "", moduleContent: "" }],
      //   courseOutcomes: [{ title: "", co: "" }],
      //   totalHours: "",
      //   totalCredits: "",
      // });
      // Parse the response JSON
      console.log("Success:", data);
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error?.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-[5vw] py-[2rem] items-center justify-start relative">
      <Link href={"/all-courses"}>
        <button className="absolute top-[2rem] left-[2rem] bg-azure-500 border-none outline-none rounded-lg p-2 text-white">
          View All Courses
        </button>
      </Link>
      <Link href={"/add-activity-point"}>
        <button className="absolute top-[5rem] left-[2rem] bg-azure-500 border-none outline-none rounded-lg p-2 text-white">
          Add Activity Point
        </button>
      </Link>
      <div className="flex flex-col items-start justify-center w-[50vw] space-y-4">
        <div className="flex items-center justify-center w-full">
          <span className="text-azure-600 font-semibold text-2xl">
            EDUCCET KTU Scheme Data Entry
          </span>
        </div>
        <div className="flex flex-col border border-gray-200 w-full p-5 rounded-lg mt-5">
          <div className="flex flex-col space-y-5">
            <div className="flex space-x-4">
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Scheme Name</span>
                <select
                  name="schemeName"
                  id="schemeName"
                  value={schemeData.schemeName}
                  onChange={handleSelectChange}
                  className="border border-gray-300 rounded px-2 py-2 outline-none w-full text-gray-800"
                >
                  <option value="">Select</option>
                  <option value="Two Thousand Ninteen Scheme">
                    Two Thousand Ninteen Scheme
                  </option>
                  <option value="Two Thousand Twenty Four Scheme">
                    Two Thousand Twenty Four Scheme
                  </option>
                </select>
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Scheme Year</span>
                <select
                  name="year"
                  id="year"
                  value={schemeData.year}
                  onChange={handleSelectChange}
                  className="border border-gray-300 rounded px-2 py-2 outline-none w-full text-gray-800"
                >
                  <option value="">Select</option>
                  <option value="2019">2019</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="group" className="block text-sm text-gray-800">
                Group Name
                <span className="text-[11px]">
                  {"  "}(If 2024 scheme, kindly enter the group else leave it
                  blank)
                </span>
              </label>
              <select
                name="groupName"
                id="group"
                value={schemeData.groupName}
                onChange={handleSelectChange}
                className="border border-gray-300 rounded px-2 py-2 outline-none w-full text-gray-800"
              >
                <option value="nill">Select</option>
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
                <option value="">Select</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electrical & Electronics Engineering">
                  Electrical & Electronics Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
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
                <option value="">Select</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
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

            <div className="w-full items-center justify-center flex">
              <div className="flex-1 bg-gray-400 h-[1px]"></div>
              <span className="mx-[1rem]">Course Outcomes</span>
              <div className="flex-1 bg-gray-400 h-[1px]"></div>
            </div>
            <div className="flex flex-col space-y-4 mt-5 w-full">
              {schemeData.courseOutcomes.map((cos, index) => (
                <div key={index} className="flex space-x-2 items-start w-full">
                  <div className="flex flex-col space-y-2 w-full">
                    <div className="flex flex-1 flex-col w-full">
                      <span className="text-sm text-gray-800">CO Title</span>
                      <input
                        type="text"
                        name="title"
                        value={cos.title}
                        onChange={(e) =>
                          handleInputChange(e, index, "courseOutcomes")
                        }
                        className="border border-gray-300 rounded-lg outline-none p-3"
                      />
                    </div>
                    <div className="flex flex-1 flex-col w-full">
                      <span className="text-sm text-gray-800">Co</span>
                      <textarea
                        rows={5}
                        name="co"
                        value={cos.co}
                        onChange={(e) =>
                          handleInputChange(e, index, "courseOutcomes")
                        }
                        className="border border-gray-300 rounded-lg outline-none p-3"
                      />
                    </div>
                  </div>
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => removeCourseOutcomes(index)}
                      className="mt-6 px-4 py-2 bg-white border border-slk-regular text-black-100 rounded-md"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCourseOutcome}
                className="mt-4 px-4 py-2 bg-azure-500 text-2xl font-semibold text-white rounded-md w-[5rem]"
              >
                +
              </button>
            </div>

            {/* Syllabus Section */}
            <div className="w-full items-center justify-center flex">
              <div className="flex-1 bg-gray-400 h-[1px]"></div>
              <span className="mx-[1rem]">Syllabus</span>
              <div className="flex-1 bg-gray-400 h-[1px]"></div>
            </div>
            <div className="flex flex-col space-y-4 mt-5 w-full">
              {schemeData.syllabus.map((syllabus, index) => (
                <div key={index} className="flex space-x-2 items-start w-full">
                  <div className="flex flex-col space-y-2 w-full">
                    <div className="flex flex-1 flex-col w-full">
                      <span className="text-sm text-gray-800">Module Name</span>
                      <input
                        type="text"
                        name="moduleName"
                        value={syllabus.moduleName}
                        onChange={(e) =>
                          handleInputChange(e, index, "syllabus")
                        }
                        className="border border-gray-300 rounded-lg outline-none p-3"
                      />
                    </div>
                    <div className="flex flex-1 flex-col w-full">
                      <span className="text-sm text-gray-800">Syllabus</span>
                      <textarea
                        rows={5}
                        name="moduleContent"
                        value={syllabus.moduleContent}
                        onChange={(e) =>
                          handleInputChange(e, index, "syllabus")
                        }
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
            <div className="flex space-x-4">
              {/* <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Total Hours</span>
                <input
                  type="text"
                  name="totalHours"
                  value={schemeData.totalHours}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div> */}
              {/* <div className="flex flex-1 flex-col">
                <span className="text-sm text-gray-800">Total Credits</span>
                <input
                  type="text"
                  name="totalCredits"
                  value={schemeData.totalCredits}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg outline-none p-3"
                />
              </div> */}
            </div>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <div className="">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="capitalize w-full bg-azure-600 rounded-lg border-none outline-none py-3 text-white"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
