import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrpyt from "bcryptjs";
import createToken from "../utils/createToken.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields.");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(201).send("User already exits");
  }
  console.log(username, email, password);

  const salt = await bcrpyt.genSalt(10);
  const hashedPassword = await bcrpyt.hash(password, salt);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    console.log("new user created");

    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    });
  } catch (error) {
    res.status(400);
    throw new Error("An error occurred. Please try again.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isValidPassword) {
      console.log("You exist");
      createToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.password,
      });
    } else {
      res.status(401).json({
        error: "unauthorized",
        message: "Invalid username or password",
      });
    }
  } else {
    res.status(401).json({
      error: "unathorized",
      message: "The user doesnt exist",
    });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.cookies.jwt) {
    return res.status(401).json({ message: "User doesnt exist" });
  }
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "User logout Sucesfully",
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  console.log(users);

  res.json(users);
});
const getProfileDetail = asyncHandler(async (req, res) => {
  try {
    const userId = await User.findById(req.user._id);

    if (userId) {
      res.status(200).json({
        _id: userId._id,
        username: userId.username,
        email: userId.email,
        password: userId.password,
      });
    } else {
      res.status(400).json({ message: "The user info is not available" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const updateProfileDetail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username;
    user.email = req.body.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }
    const Updateduser = await user.save();

    res.json({
      _id: Updateduser._id,
      username: Updateduser.username,
      email: Updateduser.email,
      isAdmin: Updateduser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const deleteUserbyId = asyncHandler(async (req, res) => {
  const user = await  User.findById(req.params.id);
  console.log(user);
  if (user) {
    if (user.isAdmin) {
      throw new Error("Cannot delete a admin");
    }
    await User.deleteOne({ _id: user._id });
    res.json({
      message: "User deleted",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const findbyId = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);
  if(user){
    res.status(200).json({
      _id:user._id,
      username:user.username,
      email:user.email,
    })
  }
  else{
    throw new Error("The user doesn't exist");
  }
});

const updateUserbyId = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);
  console.log(user);
  if(user){
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.isAdmin =Boolean(req.body.isAdmin);
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,salt);
      user.password = hashedPassword;
    }
    const updateduser =await user.save();
    console.log(updateduser);
    res.json({
      _id:updateduser._id,
      username:updateduser.username,
      email:updateduser.email,
      isAdmin:updateduser.isAdmin,
    });
  }else{
    res.status(401).json({
      message:"User not found"
    })
  }
})
export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getProfileDetail,
  updateProfileDetail,
  deleteUserbyId,
  findbyId,
  updateUserbyId, 
};
