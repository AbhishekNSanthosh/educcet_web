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
            courseOutcomes
        } = await req.json();
console.log( schemeName,
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
    courseOutcomes)

    console.log('Group name',groupName)
        // Ensure the database connection
        await connectToDB();

        // Validate input fields
        if (!schemeName || !year || !branchName || !semester || !courseName || !courseNumber || !slot || !ltp || !credits || !syllabus || !courseOutcomes) {
            throw new Error("All required fields must be provided.");
        }

        // if (typeof hours !== "number") {
        //     throw { message: "Hours should be a number." ,status:400}
        // }else  if (typeof year !== "number") {
        //     throw { message: "Year should be a number." ,status:400}
        // }else  if (typeof credits !== "number") {
        //     throw { message: "Credits should be a number." ,status:400}
        // }else  if (typeof totalCredits !== "number") {
        //     throw { message: "Total credits should be a number." ,status:400}
        // }else  if (typeof totalHours !== "number") {
        //     throw { message: "Total hours should be a number." ,status:400}
        // }

        let NewSchema;

        // Create a new Course object with destructured values
        if (!groupName) {
            NewSchema = new Scheme({
                schemeName,
                year,
                branches: {
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
                            courseOutcomes
                        }
                    }
                }
            });
        } else {
            NewSchema = new Scheme({
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
                                courseOutcomes
                            }
                        }
                    }
                }
            });
        }

        // Save the new course document
        const res = await NewSchema.save();
        console.log(res);

        return NextResponse.json({ message: "New Data Added", data: res }, { status: 200 });
    } catch (error: any) {
        console.error("Error updating student:", error);

        // Send a generic error response
        return Response.json(
            { message: error.message, desc: error.desc },
            { status: error.status || 500 }
        );
    }
};
