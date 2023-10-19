import mongoose from "mongoose";
import User from "../models/user.js";

mongoose.connect("mongodb://127.0.0.1:27017/Ann-Data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await User.deleteMany({});
  for (let i = 1; i <= 10; i++) {
    const farmer = new User({
      username: `farmer${i}`,
      email: `farmer${i}@gmail.com`,
      phone: Math.floor(Math.random() * 10000000000 + 1),
      town: `town${i}`,
      city: `city${i}`,
      password: "abc",
    });
    await farmer.save();
  }
};

seedDB();

console.log("10 users seeded!");
