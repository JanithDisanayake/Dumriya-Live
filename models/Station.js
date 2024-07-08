const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeoLocation = require("./GeoLocation");

const stationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: GeoLocation,
    required: true,
  },
});

const Station = mongoose.model("Station", stationSchema);
module.exports = Station;
