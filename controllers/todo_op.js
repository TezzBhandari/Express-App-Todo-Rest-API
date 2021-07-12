const Todo = require('../models/tasks');
const createError = require('http-errors');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Todo.find({}).exec();
    res.status(200).json({
      success: true,
      message: `Successfully returned all the tasks`,
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

const addTask = async (req, res, next) => {
  try {
    const result = await Todo.create(req.body);
    if (result != null) {
      res.status(201).json({
        success: true,
        message: `Successfully created the task`,
        response: result,
      });
    } else {
      next(createError(500, `Internal Server Error`));
    }
  } catch (err) {
    next(err);
  }
};

const deleteAllTasks = async (req, res, next) => {
  try {
    const result = await Todo.deleteMany(req.body).exec();
    if (result != null) {
      res.status(200).json({
        success: true,
        message: `Successfully deleted all tasks`,
        response: result,
      });
    } else {
      next(createError(500, `Internal Server Error`));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTasks, addTask, deleteAllTasks };
