import Scheme from "@models/Course";
import Course from "@models/Course";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    try {
        const { schemeName, year, groupName, branchName, semester, courseName, courseNumber, slot, ltp, hours, credits, syllabus, totalHours, totalCredits } = await req.json();
        // Ensure the database connection
        console.log(schemeName)
        await connectToDB();

        let NewSchema
        // Create a new Course object with destructured values
        if (groupName === "") {
            NewSchema = new Scheme({
                schemeName,
                year,
                branches: {
                    branchName,
                    semester: {
                        semester,
                        totalHours,
                        totalCredits,
                        course:{
                            slot,
                            courseNumber,
                            courseName,
                            ltp,
                            hours,
                            credits,
                            syllabus
                        }
                    }
                }
            });
        }

        // Save the new course document
        const res = await NewSchema.save();
        console.log(res)

        return NextResponse.json({ message: "New Data Added", data: res }, { status: 200 });
    } catch (err) {
        console.error("Error adding new data:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
