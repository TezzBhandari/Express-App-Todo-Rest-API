const express = require('express');

const router = express.Router();

const {
  getAllTasks,
  addTask,
  deleteAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/todo_op');

router
  .route('/')
  .get(getAllTasks)
  .post(addTask)
  .put(async (req, res, next) => {
    res.status(405).json({
      success: false,
      message: `PUT Operation is not supported on this route`,
    });
  })
  .delete(deleteAllTasks);

router
  .route('/:taskId')
  .get(getTask)
  .post(async (req, res, next) => {
    res.status(405).json({
      success: false,
      message: `POST Operation is not supported on this route`,
    });
  })
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
