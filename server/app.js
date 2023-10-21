const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const Product = require("./models/product.js");
const Admin = require("./models/admin.js");
require("dotenv").config();

// import { storage } from "../cloudinary/index.js";
const User = require("./models/user.js");
const UserDetails = require("./models/UserDetails.js");

app.use(express.static(__dirname + "../client/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3500",
      "http://localhost:5173",
      "http://localhost:3500/products",
      "http://localhost:4000",
    ],
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

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req.file);
  var imgpath = req.file.path;
  imgpath = imgpath.replace(/\\/g, "/");
  console.log("Uploading image to model...");
  const image = fs.readFileSync(imgpath, {
    encoding: "base64",
  });

  try {
    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/plants-diseases-detection-and-classification/12",
      params: {
        api_key: "yOhCoSKWhEs97HO8IBBv",
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log(response.data);
    if (response.data.predictions && response.data.predictions.length > 0) {
      const predicted_class = response.data.predictions[0].class;
      const confidence = response.data.predictions[0].confidence;
      console.log(predicted_class);
      const dataToSend = {
        predicted_class: predicted_class,
        confidence: confidence,
      };

      console.log("this is the data to be sent:", dataToSend);
      res.json(dataToSend);
      // res.send("file uploaded");
    } else {
      res.send("No predictions found in the response.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error uploading file");
  }
});

app.get("/upload", (req, res) => {});

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
      mobileNumber,
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
      mobileNumber,
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

// Forum
const questionSchema = new mongoose.Schema({
  text: String,
  tag: String, // Add a field for tags
  answers: [{ text: String }],
});

const Question = mongoose.model("Question", questionSchema);

app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/questions", async (req, res) => {
  const { text, tag } = req.body;
  try {
    const question = new Question({ text, tag, answers: [] });
    await question.save();
    res.json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/questions/:id/answers", async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  try {
    const question = await Question.findById(id);
    question.answers.push({ text });
    await question.save();
    res.json({ message: "Answer added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/admin/:id/products", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const seller = await Admin.findOne({ admin_id: id });
  if (seller) {
    const product = new Product(req.body);
    console.log(product);
    product.image =
      "https://source.unsplash.com/1600x900/?" + product.name + " plant";
    await product.save();
    console.log("Product is saved.\n", product);
    res.send(product);
  } else {
    console.log("Seller not found");
    res.send("Seller not found");
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/admin/:id/delete", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.send("Product deleted");
});

app.post("/submit-mobile-number", async (req, res) => {
  const { mobileNumber } = req.body;
  console.log(req.body);

  try {
    const admin = await Admin.findOne({ mobileNumber: mobileNumber });

    if (admin) {
      console.log("Admin found. Redirecting to /marketplace");
      res.status(200).json({ redirect: "/marketplace" });
    } else {
      console.log("Admin not found. Redirecting to /buy");
      res.status(200).json({ redirect: "/buy" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3500, () => {
  console.log("server is running on port 3500!!");
});
