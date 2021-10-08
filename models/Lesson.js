const mongoose = require("mongoose");
const LessonSchema = new mongoose.Schema(
  {
    lessonname: {
      type: String,
    },
    lessondescription : {
        type : String,
    },
    status : {
      type : String,
      default:'active'
    },
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("Lesson", LessonSchema);