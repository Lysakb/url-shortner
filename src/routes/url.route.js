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
urlRouter.post("/url/shorten", authenticateUser, createShortenUrl);
urlRouter.get("/:shortUrl", getUrl);
urlRouter.get('/user/history', authenticateUser, userHistory);
urlRouter.get("/user/link", authenticateUser, getLinks);
urlRouter.get("/qr/scan", authenticateUser, scanQr);

module.exports = urlRouter;
