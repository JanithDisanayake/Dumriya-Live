const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeoLocation = require("./GeoLocation");
const Station = require("./Station");

const routeSchema = new Schema({
  start: {
    type: Station.schema,
    require: true,
  },
  end: {
    type: Station.schema,
    require: true,
  },
  distance: {
    type: Number,
  },
  stations: {
    type: [Station.schema],
  },
  coordinates: {
    type: [GeoLocation],
    required: true,
  },
});

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
