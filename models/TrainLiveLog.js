const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Device = require("./Device");
const GeoLocation = require("./GeoLocation");

const trainLiveLogSchema = new Schema({
  device: {
    type: Device,
    required: true,
  },
  current_location: {
    type: GeoLocation,
    required: true,
  },
  reported_time: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const TrainLiveLog = mongoose.model("TrainLiveLog", trainLiveLogSchema);
module.exports = TrainLiveLog;
