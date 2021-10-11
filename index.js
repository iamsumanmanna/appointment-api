const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const studentRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");
const lessonRoutes = require("./routes/lessons")
const PORT = process.env.PORT || 8000;

dotenv.config();

const uri =
  "mongodb+srv://exnovation:exnovation@cluster0.guz8i.mongodb.net/appointment_db?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`db connection established`);
  })
  .catch((err) => console.log(`No Connection`));

//middlewere
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// end Middlewere


//Routes Middlewere
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lessons",lessonRoutes);

app.get("/",async(req, res)=>{
  res.status(200).json({
    message : "Hii Node Js App"
  })
})

//End Routes

app.listen(PORT, () => {
  console.log(`Backend Server is Running`);
});
