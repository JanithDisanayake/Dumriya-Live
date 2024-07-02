const mongoose = require("mongoose");
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
});

const Train = mongoose.model("Train", trainSchema);
module.exports = Train;
