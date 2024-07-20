const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Train = require("./Train");
const GeoLocation = require("./GeoLocation");

const trainLiveLogSchema = new Schema({
  train: {
    type: Train.schema,
    required: true,
  },
  current_location: {
    type: GeoLocation,
    required: true,
  },
  role: {
    type: String,
    required: false,
  },
  reported_time: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const TrainLiveLog = mongoose.model("TrainLiveLOg", trainLiveLogSchema);
module.exports = TrainLiveLog;
