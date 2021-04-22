const express = require("express");
const router = express.Router();
// For generating Token
const jwt = require("jsonwebtoken");
// For encrypting Password
const bcrypt = require("bcryptjs");

const User = require("../Schemas/User");

// Register a User
router.post("/register", (req, res) => {
  console.log("/register : req.body ==> ", req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(500).json({ Type: "Error on the server.", Error: err });
    }
    let htmlMsg;
    if (!user) {
      //add new user
      const hashedPasword = bcrypt.hashSync(
        req.body.password.toString(),
        parseInt(8)
      );
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPasword,
          role: "normal",
        },
        (err, user) => {
          if (err)
            return res.status(500).json({
              Type: "There was a problem registering user",
              Error: err,
            });
        res.status(201).json({ message: "Registration Successful" })
          return true;
        }
      );
    } else {
        res.status(400).json({ error: "Email exists, please enter a new one ..." })
      return false;
    }
  });
});

// Login User
router.post("/login", (req, res) => {

  User.findOne({ email: req.body.login_email }, (err, user) => {
    console.log("/login : user => ", user);
    if (err) return res.status(500).send("Error on the server.");
    if (!user) {
      res.status(400).json({ error: "Email not found, please enter a valid one ..." })
    return false;
    } else {
      const passwordIsValid = bcrypt.compareSync(
        req.body.login_password.toString(),
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null, error:'Incorrect Password' });
          
      }

      var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 86400, // expires in 24 hours
      });
      res.status(201).json({ token: token, message:'login success!' })
        return true;
    }
  });
});

module.exports = router;
