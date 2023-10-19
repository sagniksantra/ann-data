const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
// import { storage } from "../cloudinary/index.js";
const User = require("./models/user.js");
const UserDetails = require("./models/UserDetails.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001", "https://localhost:3500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: "../client/uploads", // Directory to save images
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(`DB Connection Error: ${err.message}`));
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("Database connected");
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username: username });
  if (foundUser) {
    if (foundUser.password === password) {
      console.log(foundUser);
      res.send("Welcome Back!");
    }
  } else {
    res.send("Incorrect UserName/Password.");
  }
});

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("file uploaded");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/know-more", async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      name,
      state,
      cropType,
      landAmount,
      familyMembers,
      familyIncome,
      education,
      farmingExperience,
    } = req.body;
    const newUserDetail = await UserDetails.create({
      name,
      state,
      cropType,
      landAmount,
      familyMembers,
      familyIncome,
      education,
      farmingExperience,
    });
  } catch (error) {
    console.log(error);
  }

  res.status(201).send("User Created");
});

app.get("/user-details", async (req, res, next) => {
  try {
    const userDetails = await UserDetails.find({});
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3500, () => {
  console.log("server is running on port 3500!!");
});
