import User from "../models/userModels.js";
import asyncHandler from "./asyncHandler.js";
import jwt, { decode } from "jsonwebtoken";


const authenticate = asyncHandler(async(req,res,next) => {
    let token;
    
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();

        }catch{
            res.status(401)
            throw new Error("Not authorized");
        }

    }
    else{
        res.status(400).json({
            "message":"Token couldnt be verifed"
        })
    }

})

const authorizeAdmin =  (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }  else {
        res.status(400).send("Not authorized as admin");
    }
};

export {authenticate,authorizeAdmin};