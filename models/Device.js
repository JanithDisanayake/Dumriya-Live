const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  role: {
    type: String,
    enum: ['Engine', 'Mobile'],
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

module.exports = Device;