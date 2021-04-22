const { Router } = require("express");
const news = Router();
const NewsModel = require("../Schemas/news.model");
const ObjectId = require("mongodb").ObjectId;

//Get all news
news.get("/", async (req, res) => {
  try {
    var newsCategory = req.param("newsCategory");
    if (newsCategory)
      docs = await NewsModel.find({ newsCategory: newsCategory });
    else docs = await NewsModel.find();
    res.json(docs);
    return true;
  } catch (error) {
    res.status(500);
    return false;
  }
});

//Get news by id
news.get("/:id", async (req, res) => {
  const token = req.headers.authorization || null;
  if (!token) {
    res.status(401).json({ message: "Token not found. Unauthorized access" });
    return false;
  }
  try {
    const { body, params } = req;
    var o_id = params.id;
    const docs = await NewsModel.findOne({ _id: o_id });
    res.json(docs);
    return true;
  } catch (error) {
    res.status(500);
    return false;
  }
});

//Get top 3 latest news by date
news.get("/latest", async (req, res) => {
  try {
    const docs = await NewsModel.find().sort({ publishedAt: -1 }).limit(3);
    res.json(docs);
    return true;
  } catch (error) {
    res.status(500);
    return false;
  }
});

//Post news
news.post("/addNews", async (req, res) => {
  const token = req.headers.authorization || null;
  if (!token) {
    res.status(401).json({ message: "Token not found. Unauthorized access" });
    return false;
  }
  try {
    console.log(req.body.imageUrl);
    NewsModel.create(
      {
        title: req.body.title,
        description: req.body.description,
        newsUrl: req.body.newsUrl,
        imageUrl: req.body.imageUrl,
        newsCategory: req.body.newsCategory,
      },
      (err, news) => {
        if (err) {
          return res.status(500).json({
            Type: "There was a problem ADDING NEWS",
            Error: err,
          });
        }
        res.status(201).json({ message: "News Saved Successfully!" });
        return true;
      }
    );
  } catch (error) {
    res.status(500).json({ error: error });
    return false;
  }
});

//Update news by id
news.patch("/:id", async (req, res) => {
  const token = req.headers.authorization || null;
  if (!token) {
    res.status(401).json({ message: "Token not found. Unauthorized access" });
    return false;
  }
  try {
    const { body, params } = req;
    var o_id = new ObjectId(params.id);
    const response = await NewsModel.findOneAndUpdate(
      { _id: o_id },
      { $set: body }
    );
    res.status(201).json({ message: "News was updated!" });
    return true;
  } catch (error) {
    res.status(500);
    return false;
  }
});

//Delete news by id
news.delete("/:id", async (req, res) => {
  const token = req.headers.authorization || null;
  if (!token) {
    res.status(401).json({ message: "Token not found. Unauthorized access" });
    return false;
  }
  try {
    const { body, params } = req;
    var o_id = new ObjectId(params.id);
    const response = await NewsModel.deleteOne({ _id: o_id });
    res.json({ record: "Document deleted" });
  } catch (error) {
    res.status(500);
  }
});

module.exports = news;
