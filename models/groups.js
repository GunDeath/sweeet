const mongoose = require('mongoose');

const GroupName = new mongoose.Schema({
  groupTitle: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Group = mongoose.model('Group', GroupName);

module.exports = Group;
