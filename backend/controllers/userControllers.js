import User from "../models/userModels.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrpyt from "bcryptjs";


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

    res
      .status(201)
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

export { createUser };
