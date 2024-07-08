const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the GeoJSON Point sub-schema
const GeoLocation = new Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { _id: false },
); // Disable _id for sub-documents

module.exports = GeoLocation;
