var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  name: String,
  details: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Data', taskSchema);
