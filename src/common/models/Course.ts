import { Schema, model, models } from "mongoose";


const moduleSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        required: true,
    }
})

const CourseSchema = new Schema({
    code: {
        type: String,
        require: true,
        maxlength: 6
    },
    slot: {
        type: String,
        require: true
    },
    branch: {
        type: String,
        require: true,
        enum: ["CE", "ME", "CSE", "EEE"]
    },
    group: {
        type: String,
        enum: ["A", "B", "C", "D"],
    },
    term: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    semeseter: {
        type: String,
        require: true,
    },
    year: {
        type: Number,
        required: true,
        maxlength: 4
    },
    module: [moduleSchema],
    ltp: {
        type: String,
        require: true
    },
    hours: {
        type: Number,
        require: true,
    },
    credit: {
        type: Number,
        require: true,
    },
});

const Course = models.Course || model("Course", CourseSchema);
export default Course;
