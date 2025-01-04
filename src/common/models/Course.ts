import { Schema, model, models, Document } from "mongoose";

interface IModule {
    moduleName: string;
    moduleContent: string;
}

interface ICourse {
    slot: string;
    courseNumber: string;
    courseName: string;
    ltp: string;
    hours: number;
    credits?: number;
    syllabus: IModule[];
}

interface ISemester {
    semesterNumber: number;
    course: ICourse;
    totalHours: number;
    totalCredits: number;
}

interface IBranch {
    branchName: string;
    semester: ISemester; // Changed to a single object instead of an array
}

interface IGroup {
    groupName: string;
    branch: IBranch;
}

interface IScheme extends Document {
    schemeName: string;
    year: number;
    group?: IGroup[];
    branch?: IBranch[];
}

// Define schemas
const ModuleSchema = new Schema<IModule>({
    moduleName: { type: String, required: true },
    moduleContent: { type: String, required: true },
});

const CourseSchema = new Schema<ICourse>({
    slot: { type: String, required: true },
    courseNumber: { type: String, required: true },
    courseName: { type: String, required: true },
    ltp: { type: String, required: true },
    hours: { type: Number, required: true },
    credits: { type: Number },
    syllabus: { type: [ModuleSchema], required: true },
});

const SemesterSchema = new Schema<ISemester>({
    semesterNumber: { type: Number },
    course: { type: CourseSchema },
    totalHours: { type: Number },
    totalCredits: { type: Number },
});

const BranchSchema = new Schema<IBranch>({
    branchName: {
        type: String,
        enum: [
            "Civil Engineering",
            "Computer Science",
            "Electrical & Electronics Engineering",
            "Mechanical Engineering",
        ],
        required: true,
    },
    semester: { type: SemesterSchema }, // Changed to a single object
});

const GroupSchema = new Schema<IGroup>({
    groupName: {
        type: String,
        enum: ["Group A", "Group B", "Group C", "Group D"],
        required: true,
    },
    branch: { type: BranchSchema, required: true },
});

const SchemeSchema = new Schema<IScheme>({
    schemeName: { type: String, required: true },
    year: { type: Number, required: true },
    group: { type: GroupSchema }, // Optional array of groups
    branch: { type: BranchSchema }, // Optional array of branches
});

// Create model
const Scheme = models.Scheme || model<IScheme>("Scheme", SchemeSchema);

export default Scheme;
