const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    
    return res.status(403).json({
      message: "You can update only your Account",
    });
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: "Student are Delete Successfully",
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json({
      message: "You can delete Only your account",
    });
  }
});
//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updateAt, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all user
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      message: "All student are Here",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Not found",
      error: err,
    });
  }
});
module.exports = router;
