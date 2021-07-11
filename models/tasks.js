const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  note: String,
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('todo', taskSchema);
module.exports = Todo;
