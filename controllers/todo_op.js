const Todo = require('../models/tasks');
const createError = require('http-errors');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Todo.find({}).exec();
    if (tasks.length === 0) {
      return res.status(200).json({
        success: true,
        message: `No Task Available`,
      });
    }
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
    res.status(201).json({
      success: true,
      message: `Successfully created the task`,
      response: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAllTasks = async (req, res, next) => {
  try {
    const result = await Todo.deleteMany().exec();
    if (result.n === 0 && result.deletedCount === 0) {
      return res.status(200).json({
        success: true,
        message: `No task Available to delete`,
      });
    } else if (result.n > 0 && result.deletedCount === 0) {
      return res.status(500).json({
        success: false,
        message: `Failed to delete the items`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Successfully deleted all tasks`,
      response: result,
    });
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Todo.findById(req.params.taskId).exec();
    if (task === null) {
      return res.status(200).json({
        success: true,
        message: `There is no task with an ID of ${req.params.taskId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Sucessfully returned a task with an ID of ${req.params.taskId}`,
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      req.params.taskId,
      { $set: req.body },
      { new: true }
    );

    if (result === null) {
      return res.status(200).json({
        success: true,
        message: `There is no task with an id of ${req.params.taskId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `successfully updated the task with an id of ${req.params.taskId}`,
      response: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const result = await Todo.findByIdAndRemove(req.params.taskId);
    if (result === null) {
      return res.status(200).json({
        success: true,
        message: `There is no task with an ID of ${req.params.taskId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `successfully deleted the task with an id of ${req.params.taskId}`,
      response: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTasks,
  addTask,
  deleteAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
