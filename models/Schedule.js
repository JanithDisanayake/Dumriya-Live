const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GeoLocation = require("./GeoLocation");
const Route = require("./Route");
const Train = require("./Train");
const Station = require("./Station");

const scheduleSchema = new Schema({
  train: {
    type: Train.schema,
    required: true,
  },
  route: {
    type: Route.schema,
    required: true,
  },
  depature_time: {
    type: Date,
    requred: true,
  },
  arrival_time: {
    type: Date,
    requred: true,
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
