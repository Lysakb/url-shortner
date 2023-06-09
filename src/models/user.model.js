const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  ipAddress: {
    type: String,
    
  },

  userAgent: {
    type: String,
    
  },
});

module.exports = mongoose.model("User", userSchema);
