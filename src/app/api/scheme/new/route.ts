import Course from "@models/Course";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const data = await req.json();

    try {
        connectToDB();

        const NewSchema = new Course({

        });

        NewSchema.save();
        return NextResponse.json({ message: "New Data Added" }, { status: 200 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal server Error" }, { status: 500 });
    }
}