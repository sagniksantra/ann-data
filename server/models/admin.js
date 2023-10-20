const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String
  },
  admin_id: Number,
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
