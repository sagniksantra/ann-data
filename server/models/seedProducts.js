const mongoose = require("mongoose");
const Product = require("./product");
require("dotenv").config();
const crops = ["Rice", "Maize", "Wheat", "Barley", "Oats"];

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
    await Product.deleteMany({});

    for (let i = 0; i < crops.length; i++) {
      const product = new Product({
        name: crops[i],
        price: 159,
        image: `https://source.unsplash.com/1600x900/?${crops[i]} plant`,
        category: "Food",
        quantity: 10,
      });

      // Insert each product into the database
      await product.save();
    }

    // Disconnect from the database after seeding
    await mongoose.disconnect();

    console.log("DB Seeded");
  } catch (err) {
    console.error(err);
  }
};

seedDB();
