import express from "express";
import mongoose from "mongoose";
const app = express();
const router = express.Router();
import cors from "cors";
import path from "path";
import multer from "multer";
// import { storage } from "../cloudinary/index.js";
import User from "./models/user.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/Ann-Data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

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

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.send("User Created");
});

app.listen(3000, () => {
  console.log("server is running on port 3000!!");
});
