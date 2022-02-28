//register
//login
//get loggedin user detail 
const router = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const secretKey = process.env.secret_key;
const authenticate = require("../middleware/authenticate");
// const { findByIdAndUpdate } = require("../models/User");

//registering new user and sending jwt token
router.post(
  "/register",
  [
    body("name", "length of name should be greater than 3").isLength({
      min: 3,
    }),
    body("name", "length of name should be less than 15").isLength({
      max:15
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a strong password with in 5 to 20 letters").isLength({ min: 5, max:20 }),
  ],
  async (req, res) => {
    try {
      //checking in-coming req body
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(400).json({ error: error.array()[0].msg });
      //check is given email exists
      let user = await User.findOne({ email: req.body.email });
      if (user)
        return res.status(400).json({
          error: "Sorry! user with same email address already exists",
        });
      //hashing password
      const salt = await bcrypt.genSalt(10);
      const hassedPassword = await bcrypt.hash(req.body.password, salt);
      //creating the user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hassedPassword,
      });
      //sending jwt token
      const payload = {
        user: {
          id: user.id,
          name:user.name
        },
      };
      const authtoken = jwt.sign(payload, secretKey);
      //on success
      res
        .status(200)
        .json({ message: "User created successfully!", authtoken });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

//login user and on success send jwt token
router.post(
  "/login",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    try {
      //checking in-coming req body
      const error = validationResult(req);
      if (!error.isEmpty())
        return res.status(400).json({ error: error.array()[0].msg });
      //finding the user with given email
      let user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(400).json({ error: "Incorrect email or password" });
      //check the password
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid)
        return res.status(400).json({ error: "Incorrect email or password" });
      //sending jwt token
      const payload = {
        user: {
          id: user.id,
          name:user.name
        },
      };
      const authtoken = jwt.sign(payload, secretKey);
      res
        .status(200)
        .json({ message: "User logged in successfully!", authtoken });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

//get the user detail after authenticating the header auth token
router.get("/loggedinuser", authenticate, async (req, res) => {
  try {
    const userDetail = req.user;
    let user = await User.findOne({ _id: userDetail.id });
    if (!user)
      return res
        .status(401)
        .json({ error: "User not found, try with valid token" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
//update bio of user
router.put("/updatebio", authenticate, async (req, res) => {
  try {
    let user = await User.findOne({ _id:req.user.id });
      if (!user) return res.status(401).json({ error: "Cannot find the User" });
      // console.log(Post.user, req.user.id);
      //since user is object type so need to be converted to string or else you can change Post scheme of user to String
      user = await User.findByIdAndUpdate(req.user.id, {bio:req.body.bio}, {new: true})
      res.status(200).json({ message: "user is successfully updated", user });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: error });
  }
});


module.exports = router;
