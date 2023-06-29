const express = require('express');
require('express-async-errors');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const urlRouter = require("../routes/url.route");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
// const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', urlRouter);
//default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to url-shortner',
  });
});

// Catching all Undefined Routes
app.use("*", (req, res) => {
  return res.status(404).json({
    status: false,
    message: `Route ${req.originalUrl} not found`,
  });
});


module.exports = app;
