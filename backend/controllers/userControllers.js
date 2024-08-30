import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrpyt from "bcryptjs";
import createToken from "../utils/createToken.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";


const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if(!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields.");
  };

  const userExists = await User.findOne({email});

  
  if(userExists)  {  res.status(201).send("User already exits") };
  console.log(username, email, password);

  const salt = await bcrpyt.genSalt(10);
  const hashedPassword = await bcrpyt.hash(password, salt); 

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res,newUser._id);
    console.log('new user created');

    res
      .status(200)
      .json({
        _id: newUser._id,
        username: newUser.username,
    email: newUser.email,
        password: newUser.password,
      });
  } catch(error) {
    res.status(400);
    throw new Error("An error occurred. Please try again.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (isValidPassword) {
      console.log('You exist');
      createToken(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.password
      });
    } else {
      res.status(401).json({
        error: "unauthorized",
        message: "Invalid username or password"
      });
    }
  }
else{
  res.status(401).json({
    error:"unathorized",
    "message":"The user doesnt exist"
  })
}
});

export { createUser,loginUser };
