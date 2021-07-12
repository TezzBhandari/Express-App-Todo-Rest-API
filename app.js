const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const router = require('./routes/todo_route');

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@todo.ogpgv.mongodb.net/todos?retryWrites=true&w=majority`;
console.log(URI);

const connectDB = async (req, res, next) => {
  try {
    const connect = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Successfully Connected to the Database!');
  } catch (err) {
    console.error(`Connection Fail:\nError:${err}`);
  }
};

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
    stack: err.stack,
  });
});

connectDB();
module.exports = app;
