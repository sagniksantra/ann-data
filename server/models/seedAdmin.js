const mongoose = require("mongoose");
const Admin = require("./admin");
require("dotenv").config();

const seedDB = async () => {
  try {
    // Connect to the MongoDB database
    mongoose
      .connect(
        "mongodb+srv://sranjan0208:kafka@cluster0.uksgwg0.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("DB Connected"))
      .catch((err) => console.log(`DB Connection Error: ${err.message}`));

    // Remove all existing documents in the Product collection
    await Admin.deleteMany({});

    for (let i = 0; i < 1; i++) {
      const admin = new Admin({
        username: "admin111",
        admin_id: 111,
      });

      // Insert each product into the database
      await admin.save();
    }

    // Disconnect from the database after seeding
    await mongoose.disconnect();

    console.log("DB Seeded");
  } catch (err) {
    console.error(err);
  }
};

seedDB();
