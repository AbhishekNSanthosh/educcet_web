import Scheme from "@models/Course";
import Course from "@models/Course";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    try {
        const {
            schemeName,
            year,
            groupName,
            branchName,
            semester,
            courseName,
            courseNumber,
            slot,
            ltp,
            hours,
            credits,
            syllabus,
            courseOutcomes,
        } = await req.json();

        console.log("Received data:", {
            schemeName,
            year,
            groupName,
            branchName,
            semester,
            courseName,
            courseNumber,
            slot,
            ltp,
            hours,
            credits,
            syllabus,
            courseOutcomes,
        });

        console.log("check: ",groupName === "nill")

        // Ensure the database connection
        await connectToDB();

        // Validate required fields
        if (
            !schemeName ||
            !year ||
            !branchName ||
            !semester ||
            !courseName ||
            !courseNumber ||
            !slot ||
            !ltp ||
            !credits ||
            !syllabus ||
            !courseOutcomes
        ) {
            throw new Error("All required fields must be provided.");
        }

        // Validate data types
        // if (typeof year !== "number") {
        //     throw new Error("Year must be a number.");
        // }
        // if (typeof hours !== "number") {
        //     throw new Error("Hours must be a number.");
        // }
        // if (typeof credits !== "number") {
        //     throw new Error("Credits must be a number.");
        // }

        let newSchema;

        // Check if groupName exists and construct the schema accordingly
        if (groupName && groupName.toLowerCase() !== 'nill') {
            newSchema = new Scheme({
                schemeName,
                year,
                group: {
                    groupName,
                    branch: {
                        branchName,
                        semester: {
                            semesterNumber: semester,
                            course: {
                                slot,
                                courseNumber,
                                courseName,
                                ltp,
                                hours,
                                credits,
                                syllabus,
                                courseOutcomes,
                            },
                        },
                    },
                },
            });
            console.log("Schema with groupName created.");
        } else {
            newSchema = new Scheme({
                schemeName,
                year,
                branch: {
                    branchName,
                    semester: {
                        semesterNumber: semester,
                        course: {
                            slot,
                            courseNumber,
                            courseName,
                            ltp,
                            hours,
                            credits,
                            syllabus,
                            courseOutcomes,
                        },
                    },
                },
            });
            console.log("Schema without groupName created.");
        }
        

        // Save the schema to the database
        const res = await newSchema.save();
        console.log("Data saved:", res);

        return NextResponse.json(
            { message: "New Data Added", data: res },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error adding data:", error.message);

        return NextResponse.json(
            { message: error.message || "An error occurred" },
            { status: error.status || 500 }
        );
    }
};
