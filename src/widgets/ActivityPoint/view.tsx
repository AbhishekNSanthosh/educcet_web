"use client";

import React, { useState } from "react";

export default function AddActivityPoint() {
  const [activityData, setActivityData] = useState({
    slNo: "",
    year: "",
    group: "",
    courses: [""], // Array for multiple course names
    credits: "",
    minimumCreditRequirements: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleCourseChange = (index: number, value: any) => {
    const updatedCourses = [...activityData.courses];
    updatedCourses[index] = value;
    setActivityData({ ...activityData, courses: updatedCourses });
  };

  const addCourseField = () => {
    setActivityData({
      ...activityData,
      courses: [...activityData.courses, ""],
    });
  };

  const removeCourseField = (index: number) => {
    const updatedCourses = activityData.courses.filter((_, i) => i !== index);
    setActivityData({ ...activityData, courses: updatedCourses });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Activity Data Submitted:", activityData);
    // You can send this data to your API or database
  };

  console.log(activityData)

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Add Activity Point
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="slNo" className="block text-sm font-medium">
            Serial Number
          </label>
          <input
            type="number"
            id="slNo"
            name="slNo"
            value={activityData.slNo}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium">
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={activityData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="group" className="block text-sm font-medium">
            Group
          </label>
          <input
            type="text"
            id="group"
            name="group"
            value={activityData.group}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Courses</label>
          {activityData.courses.map((course, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={course}
                onChange={(e) => handleCourseChange(index, e.target.value)}
                className="flex-grow p-2 border rounded-md"
                placeholder={`Course ${index + 1}`}
                required
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => removeCourseField(index)}
                  className="ml-2 px-3 py-1 text-sm bg-white text-azure-600 border border-azure-600 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCourseField}
            className="px-4 py-2 mt-2 text-sm bg-azure-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Course
          </button>
        </div>
        <div className="mb-4">
          <label htmlFor="credits" className="block text-sm font-medium">
            Credits
          </label>
          <input
            type="number"
            id="credits"
            name="credits"
            value={activityData.credits}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="minimumCreditRequirements"
            className="block text-sm font-medium"
          >
            Minimum Credit Requirements
          </label>
          <input
            type="text"
            id="minimumCreditRequirements"
            name="minimumCreditRequirements"
            value={activityData.minimumCreditRequirements}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
