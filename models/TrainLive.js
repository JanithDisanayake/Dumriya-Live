const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Train = require("./Train");
const Station = require("./Station");
const GeoLocation = require("./GeoLocation");

const trainLiveSchema = new Schema({
  train: {
    type: Train.schema,
    required: true,
  },
  current_location: {
    type: GeoLocation,
    required: true,
  },
  previous_station: {
    type: Station.schema,
    required: true,
  },
  next_station: {
    type: Station.schema,
    required: true,
  }
});

const TrainLive = mongoose.model("TrainLive", trainLiveSchema);
module.exports = TrainLive;
