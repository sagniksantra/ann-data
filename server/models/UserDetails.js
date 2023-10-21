const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  cropType: {
    type: String,
    require: true,
  },
  landAmount: {
    type: Number,
    require: true,
  },
  familyMembers: {
    type: Number,
    require: true,
  },
  familyIncome: {
    type: Number,
    require: true,
  },
  education: {
    type: String,
    require: true,
  },
  farmingExperience: {
    type: Number,
    require: true,
  },
  mobileNumber: {
    type: Number,
    require: true,
  },
});

const UserDetails = mongoose.model("UserDetails", userDetailSchema);

module.exports = UserDetails;
