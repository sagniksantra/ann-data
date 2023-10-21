const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  mobileNumber: Number,
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
