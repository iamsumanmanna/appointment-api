const router = require("express").Router();
const Lesson = require("../models/Lesson");
//update Lesson
router.put("/:id", async (req, res) => {
    if (req.body.lessonId === req.params.id) {
      try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json({
            message : 'Lesson updated successfully',
            lesson : lesson
        });
      } catch (err) {
        return res.status(500).json({
            message : 'Lesson updated not found',
            error : err
        });
      }
    } else {
      return res.status(403).json({
        message: "You can update only your Account",
      });
    }
  });
//insert Lesson
router.post("/add", async (req, res, next) => {
  const newLesson = new Lesson({
    lessonname: req.body.lessonname,
    lessondescription: req.body.lessondescription,
  });
  try {
    const lesson = await newLesson.save();
    res.status(200).json({
      message: "Lesson saved Successfully",
      lesson: lesson,
    });
  } catch (err) {
    res.status(500).json({
      message: "Lesson saved unsuccesfully",
      error: err,
    });
  }
});

//get all Lesson
router.get("/", async (req, res) => {
  try {
    const lesson = await Lesson.find();
    res.status(200).json({
      message: "Get all lesson here",
      lesson: lesson,
    });
  } catch (err) {
    res.status(500).json({
      message: "Invalid Lesson",
      error: err,
    });
  }
});
//delete Data
router.delete("/:id", async (req, res) => {
  if (req.body.lessonId === req.params.id) {
    try {
      await Lesson.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: "Lesson are Delete Successfully",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Lesson are not deleted successfully",
        error: err,
      });
    }
  } else {
    return res.status(403).json({
      message: "You can delete Only your account",
    });
  }
});
//get Lesson with id
router.get("/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    res.status(200).json({
      message: "Get Lesson with id " + req.params.id,
      lesson: lesson,
    });
  } catch (err) {
    res.status(500).json({
      message: "Invalid Id",
      error: err,
    });
  }
});
module.exports = router;
