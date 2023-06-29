const urlModel = require("../models/url.model");
const validUrl = require("valid-url");
const shortid = require("shortid");
const qr = require("qrcode");
// const { redisClient } = require("../setup/redis");
const userModel = require("../models/user.model");

const createShortenUrl = async (req, res) => {
  let shortURL;
  const { originalUrl, customUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  const userId = req.user._id;

  if (userId) {
    const user = await userModel.findById(userId);

    if (user) {
      shortURL = await urlModel.create({
        originalUrl,
        shortUrl: customUrl || shortid.generate(),
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
        userId: user._id,
      });
      await user.save();
    } else {
      shortURL = await urlModel.create({
        originalUrl,
        shortUrl: customUrl || shortid.generate(),
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
        userId: user._id,
      });
    }
  } else {
    shortURL = await urlModel.create({
      originalUrl,
      shortUrl: customUrl || shortid.generate(),
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
      userId: userId,
    });
  }
  
   const url = baseUrl + "/" + shortURL.shortUrl;

//    client.setEx(newShortUrl.shortUrl, 3600, originalUrl);

   return res
     .status(201)
     .json({ message: "Url Created Successfully", url: url });
  //  redisClient.setEx(shortURL, 3600, JSON.stringify(shortURL));
};

const getUrl = async (req, res) => {
  try {
    const {shortUrl} = req.params;
    
    const url = await urlModel.findOne({
      shortUrl: shortUrl,
    });
  
    if (!url || url == null) {
      return res.status(404).json({ message: "No url found" });
    }
    url.clicks++;
    url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await urlModel.find().select("shortUrl");

    if (!links) {
      return res.status(404).json({ message: "No links found" });
    }

    res.status(200).json({
      message: "Links fetched successfully",
      data: links,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};

const userHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const url = await urlModel.find({ userId }).populate("userId", {
      name: 1,
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    if (!url || url.length === 0) {
      return res.status(404).json({ message: "No user found!" });
    }

    return res.status(200).json({ message: url });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const scanQr = async (req, res) => {
  try {
    let { shortUrl } = req.body;
    console.log(shortUrl);
    const url = await urlModel.findOne({ shortUrl: shortUrl });

    if(!url || url == null){
        return res.status(404).json({ message: "No user found!" });
    }

    const qrCode=  await qr.toDataURL(url.originalUrl);
    url.clicks++;
    url.save();

    return res.status(200).json({ message: qrCode });
  } catch (error) {
    console.error(error)
    res.status(500).json(error.message);
  }
};

module.exports = {
  createShortenUrl,
  getUrl,
  scanQr,
  getLinks,
  userHistory
};
