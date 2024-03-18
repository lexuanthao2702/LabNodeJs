const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// taoj 1 collection dítributor - table
const Distributors = new Schema({
  name: { type: String,},
}, {
    timestamps: true
});

module.exports = mongoose.model("Distributors", Distributors);
