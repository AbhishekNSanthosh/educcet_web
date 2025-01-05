'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Interfaces
interface Module {
  moduleName: string;
  moduleContent: string;
  _id: string;
}

interface Course {
  slot: string;
  courseNumber: string;
  courseName: string;
  ltp: string;
  hours: number;
  credits: number;
  syllabus: Module[];
  _id: string;
}

interface Semester {
  semesterNumber?: number;
  course: Course;
  totalHours: number | null;
  totalCredits: number | null;
  _id: string;
}

interface Branch {
  branchName: string;
  semester: Semester;
  _id: string;
}

interface Group {
  groupName: string;
  branch: Branch;
  _id: string;
}

interface Branches {
  branchName: string;
  semester: Semester;
  _id: string;
}

interface CourseScheme {
  _id: string;
  schemeName: string;
  year: number;
  branches?: Branches;
  group?: Group;
  __v: number;
}

interface CourseResponse {
  data: CourseScheme[];
}

const App: React.FC = () => {
  const [data, setData] = useState<CourseScheme[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/courses/list-all-courses", {
          method: "POST",
        });
        const result: CourseResponse = await response.json();
        setData(result.data);
      } catch (err) {
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
        <Link href={'/'}>
        <button className="absolute top-[2rem] left-[2rem] bg-azure-500 border-none outline-none rounded-lg p-2 text-white">
         Add new course
        </button>
      </Link>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">Course Schemes</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ul className="space-y-6">
          {data.map((scheme) => (
            <li key={scheme._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-blue-500 mb-4">
                {scheme.schemeName} ({scheme.year})
              </h2>
              {scheme.branches && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Branch: {scheme.branches.branchName}</h3>
                  <p className="text-gray-600">Total Hours: {scheme.branches.semester.totalHours ?? "N/A"}</p>
                  <p className="text-gray-600">Total Credits: {scheme.branches.semester.totalCredits ?? "N/A"}</p>
                  <h4 className="text-md font-semibold text-gray-800 mt-4">Course Details:</h4>
                  <div className="text-gray-600 space-y-1">
                    <p>Slot: {scheme.branches.semester.course.slot}</p>
                    <p>Course Number: {scheme.branches.semester.course.courseNumber}</p>
                    <p>Course Name: {scheme.branches.semester.course.courseName}</p>
                    <p>LTP: {scheme.branches.semester.course.ltp}</p>
                    <p>Hours: {scheme.branches.semester.course.hours}</p>
                    <p>Credits: {scheme.branches.semester.course.credits}</p>
                  </div>
                  <h5 className="text-md font-semibold text-gray-800 mt-4">Syllabus:</h5>
                  <ul className="list-disc list-inside space-y-2">
                    {scheme.branches.semester.course.syllabus.map((module) => (
                      <li key={module._id}>
                        <p className="font-medium text-gray-700">{module.moduleName}</p>
                        <p className="text-gray-600">{module.moduleContent}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {scheme.group && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700">Group: {scheme.group.groupName}</h3>
                  <h4 className="text-md font-semibold text-gray-800 mt-4">Branch: {scheme.group.branch.branchName}</h4>
                  <p className="text-gray-600">Total Hours: {scheme.group.branch.semester.totalHours ?? "N/A"}</p>
                  <p className="text-gray-600">Total Credits: {scheme.group.branch.semester.totalCredits ?? "N/A"}</p>
                  <h4 className="text-md font-semibold text-gray-800 mt-4">Course Details:</h4>
                  <div className="text-gray-600 space-y-1">
                    <p>Slot: {scheme.group.branch.semester.course.slot}</p>
                    <p>Course Number: {scheme.group.branch.semester.course.courseNumber}</p>
                    <p>Course Name: {scheme.group.branch.semester.course.courseName}</p>
                    <p>LTP: {scheme.group.branch.semester.course.ltp}</p>
                    <p>Hours: {scheme.group.branch.semester.course.hours}</p>
                    <p>Credits: {scheme.group.branch.semester.course.credits}</p>
                  </div>
                  <h5 className="text-md font-semibold text-gray-800 mt-4">Syllabus:</h5>
                  <ul className="list-disc list-inside space-y-2">
                    {scheme.group.branch.semester.course.syllabus.map((module) => (
                      <li key={module._id}>
                        <p className="font-medium text-gray-700">{module.moduleName}</p>
                        <p className="text-gray-600">{module.moduleContent}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
