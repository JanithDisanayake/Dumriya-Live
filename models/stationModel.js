const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
