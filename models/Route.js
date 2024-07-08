const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeoLocation = require("./GeoLocation");
const Station = require("./Station");

const routeSchema = new Schema({
  start: {
    type: Station,
    require: true,
  },
  end: {
    type: Station,
    require: true,
  },
  distance: {
    type: Number,
  },
  stations: {
    type: [Station],
  },
  coordinates: {
    type: [GeoLocation],
    required: true,
  },
});

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
