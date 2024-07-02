const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
});

const Route = mongoose.model("Train", routeSchema);
module.exports = Route;
