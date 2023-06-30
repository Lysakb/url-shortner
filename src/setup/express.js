const express = require('express');
require('express-async-errors');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const urlRouter = require("../routes/url.route");

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("../utils/swaggerDocument");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = swaggerJSDoc(swaggerDefinition);


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
app.use(cors({
  origin: '*',
  credentials: true
}));


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
