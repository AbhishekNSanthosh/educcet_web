import Scheme from "@models/Course";
import { connectToDB } from "@utils/database"

export const POST = async (req: any) => {
    try {
        await connectToDB();
        const courses = await Scheme.find();
        return Response.json({ data: courses, count: courses?.length || 0 }, { status: 200, statusText: "ok" })
    } catch (error: any) {
        console.log(error)
        return Response.json({ message: error.message || "Internal Server Error" }, { status: error.status || 500 })
    }
}