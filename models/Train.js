const mongoose = require("mongoose");
const Device = require("./Device");
const Schema = mongoose.Schema;

const trainSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  engines: {
    type: [Device],
    required: true,
  },
  boxes: {
    type: Number,
  },
});

const Train = mongoose.model("Train", trainSchema);
module.exports = Train;
