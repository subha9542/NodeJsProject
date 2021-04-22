const mongoose = require("mongoose");
const mongourl = "mongodb://127.0.0.1:27017/HotWire";
let db = mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Error connecting to db: " + err);
  });

module.exports = db;
