const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// taoj 1 collection user - user
const Users = new Schema({
  username: { type: String, unique: true, maxLength: 255},
  password: { type: String },
  email: { type: String, unique: true },
  // email: { type: String },
  name: { type: String },
  avarta: { type: String },
  age: { type: Number, min: 18, max: 60 },
  available: { type: Boolean, default: false },
}, {
    timestamps: true
});

module.exports = mongoose.model("user", Users);
