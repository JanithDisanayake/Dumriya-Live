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
  halt_stations: {
    type: [Station.schema],
  }
});

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
