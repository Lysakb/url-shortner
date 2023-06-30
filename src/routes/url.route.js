const express = require("express");
const {
  createShortenUrl,
  getUrl,
  scanQr,
  userHistory,
  getLinks,
} = require("../controllers/url.controller");
const { userSignup, userLogin } = require("../controllers/user.controller");
const authenticateUser = require("../middlewares/authentication");
const urlRouter = express.Router();

urlRouter.post('/user/create', userSignup);
urlRouter.post('/user/login', userLogin);
urlRouter.post("/url/shorten", createShortenUrl);
urlRouter.get("/:shortUrl", getUrl);
urlRouter.get('/user/history', userHistory);
urlRouter.get("/user/link", getLinks);
urlRouter.get("/qr/scan", scanQr);

module.exports = urlRouter;
