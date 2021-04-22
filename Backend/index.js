const express = require("express");
const app = express();
const db = require("./Schemas/db");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

const NewsController = require("./Routes/newsController");
app.use("/news", NewsController);

//by Subash - importing user schema

const UserController = require("./Routes/UserController");
app.use("/users", UserController);

const AuthController = require("./Routes/AuthController");
app.use("/auth", AuthController);

//User schemas
const User = require("./Schemas/User");

app.get("/", (req, res) => {
  res.send("Home page working");
});

//Added the weather route

app.get("/getWeather/:lat/:lon", (req, res) => {
  let lat = req.params.lat;
  let lon = req.params.lon;

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,daily,alerts&appid=${process.env.WEATHER_API_KEY}`
    )
    .then((weather) => {
      console.log(weather.data);
      return res.json(weather.data);
    })
    .catch((err) => {
      // console.error(err);
      return res.status(501).json({ Error: err });
    });
});

// Geolocation API

app.get("/getLocation/:lat/:lon", (req, res) => {
  let lat = req.params.lat;
  let lon = req.params.lon;

  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyAN5wVXvDnIKnju9wjhaoT_-qHb-ULVjO0`
    )
    .then((loc) => {
      console.log(loc.data);
      return res.json(loc.data);
    })
    .catch((err) => {
      return res.status(501).json({ Error: err });
    });
});

app.get("/whoami", async (req, res) => {
  const token = req.headers.authorization || null;
  console.log(token);
  if (!token) {
    res
      .status(401)
      .json({ message: "not authorzied", Error: "No token provided" });
    return false;
  }
  // refer line > jwt.sign({
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ _id: decoded.id });
    res.json(user);

    return true;
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "not authorzied", Error: err });
    return false;
  }
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`API is serving on port ${process.env.PORT}`);
});

/*************************************************CHAT SERVER*********************************************************/

const server = http.createServer(app);
const connections = []// to store connections

const io = socketio(server, {
    cors: {
        origin: "*"
    }
});

//client is reference to that specific person who connects
io.on("connection", (client)=> {

    client.on("login", (username)=> {
        //to see which person is logged in, store logged in users into connections array and serve the array to client
        connections[username] = client;
        io.emit("totalusers",{total: Object.keys(connections).length, names: Object.keys(connections)});
        
    });

    //send to each client when new message is received --> broadcast.emit
    client.on("chat", (data)=> {
        //Send to all people who have joined the chat
        const {message, user, date} = data
        client.broadcast.emit("message", {message: message, user: user, date: date})
    })
})

server.listen(process.env.CHAT_SERVER_PORT, (req, res)=> {
  console.log(`Chat server listening on port ${process.env.CHAT_SERVER_PORT}`)
});



