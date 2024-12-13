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
    courses: ICourse[];
    totalHours: number;
    totalCredits: number;
}

interface IBranch {
    branchName: string;
    semesters: ISemester[];
}

interface IGroup {
    groupName: string;
    branches: IBranch[];
}

interface IScheme extends Document {
    schemeName: string;
    year: number;
    groups?: IGroup[];
    branches?: IBranch[];
}

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
    semesterNumber: { type: Number, required: true },
    courses: { type: [CourseSchema], required: true },
    totalHours: { type: Number, required: true },
    totalCredits: { type: Number, required: true },
});

const BranchSchema = new Schema<IBranch>({
    branchName: { type: String, required: true, enum: ["Civil Engineering", "Computer Science", "Electrical Engineering", "Mechanical Engineering"] },
    semesters: { type: [SemesterSchema], required: true },
});

// Schema for group information (only for 2024 scheme)
const GroupSchema = new Schema<IGroup>({
    groupName: { type: String, required: true, enum: ["Group A", "Group B", "Group C", "Group D"] },
    branches: { type: [BranchSchema], required: true },
});

// Main schema for the overall course structure
const SchemeSchema = new Schema<IScheme>({
    schemeName: { type: String, required: true },
    year: { type: Number, required: true },
    groups: {
        type: [GroupSchema],
        required: function (this: IScheme) {
            return this.year === 2024; // Groups are only required for 2024
        },
    },
    branches: {
        type: [BranchSchema],
        required: function (this: IScheme) {
            return this.year !== 2024; // Branches are required for years other than 2024
        },
    },
});

const Scheme = models.Scheme || model<IScheme>("Scheme", SchemeSchema);

export default Scheme;
