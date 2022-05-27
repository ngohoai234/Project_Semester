const express = require('express');
const multer = require('multer');
const morgan = require('morgan');
const cors = require('cors');
const globalErrorHandler = require('./controllers.js/globalErrorHandler');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');

const corOptions = {
  origin: 'http://localhost:8080',
};

const userRoute = require('./routes/userRouter');

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: ' Too many requests from this IP, please try again in an hour',
});

// ! apply for all of requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security for headers

app.use(helmet());

// limit requests to server
app.use('/', limiter);

// cross site  scripting (XMLHttpRequest)

app.use(xss());

// prevent parameter pollution -> duplicate
app.use(hpp());

app.use(cors(corOptions));

// body parser and static file
app.use(
  express.json({
    limit: '10kb',
  })
);

app.use(cookieParser());

app.use('/', userRoute);

app.all('*', function (req, res, next) {
  const error = new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  next(error);
});

app.use(globalErrorHandler);

module.exports = app;
