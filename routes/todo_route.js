const express = require('express');

const router = express.Router();

const {
  getAllTasks,
  addTask,
  deleteAllTasks,
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
  .get()
  .post(async (req, res, next) => {
    res.status(405).json({
      success: false,
      message: `POST Operation is not supported on this route`,
    });
  })
  .put()
  .delete();

module.exports = router;
