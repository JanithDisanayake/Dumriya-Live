const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeoPoint = require("./GeoLocation");

const routeSchema = new Schema({
  start: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: GeoPoint,
      required: true,
    },
  },
  end: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: GeoPoint,
      required: true,
    },
  },
  distance: {
    type: Number,
    required: true,
  },
  coordinates: {
    type: [GeoPoint],
    required: true,
  },
});

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
