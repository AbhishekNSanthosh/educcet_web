const mongoose = require("mongoose");

const activityCourseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
});

const activityPointsSchema = new mongoose.Schema({
    slNo: { type: Number, required: true },
    year: { type: Number, required: true },
    group: { type: String, required: true },
    courses: [{ type: activityCourseSchema, required: true }],
    credits: { type: Number, required: true },
    minimumCreditRequirements: { type: String, required: true },
});

const ActivityPoints = mongoose.model("ActivityPoints", activityPointsSchema);

module.exports = ActivityPoints;
