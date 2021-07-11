const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const router = require('./routes/todo_route');

// const Bluebird = require('bluebird');
// mongoose.Promise = Bluebird;

const URI = `mongodb+srv://TezzBhandari:Cristiano18@@todo.ogpgv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

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

// "cookie-parser": "~1.4.4",
//     "debug": "~2.6.9",
//     "express": "~4.16.1",
//     "http-errors": "~1.6.3",
//     "jade": "~1.11.0",
//     "morgan": "~1.9.1"
