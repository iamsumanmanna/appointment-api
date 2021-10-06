const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    role : {
      type : String,
      default : "student",
      enum : ["student","teacher","admin"],
    },
    gender : {
      type : String,
      default : "",
    },
    username : {
      type : String,
      default : "",
    },
    name: {
      type: String,
      min: 5,
      max: 20,
      unique: true,
    },
    mobile: {
      type: String,
      max: 10,
      unique: true,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    status : {
      type : String,
      default:'active'
    }
  },
  { timestamps: true },
  { versionKey: false }
);

module.exports = mongoose.model("User", UserSchema);
