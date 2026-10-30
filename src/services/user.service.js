
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";

const createUser=async(data)=>{
    const user=await User.create(data);
    const token=await jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.EXPIRESIN})
    const userObject = user.toObject();
    delete userObject.password;

    return {
        data: userObject,
        token,
    };

}

const LoginUser=async(data)=>{
    const {email,password}=data;
     const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new AppError("Invalid email or password");
    }

    const token=await jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.EXPIRESIN})
    return {
        data:user,
        token,
    };

}

const getAllUsers=async()=>{
    return await User.find();
}

const GetUserByID=async(id)=>{
    const user=await User.findById(id);
    if(!user){
        throw new AppError("user not found");
    }
    return user;
}

const UpdateUserData=async(id,data)=>{
    return await User.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true
    }
  ).select("-password");
}

const deleteUser=async(id)=>{
    return await User.findByIdAndDelete(id);

}

const changeRoleUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("User not found");
  }

  user.role = "admin";

  await user.save();

  return user;
};

export  {createUser,getAllUsers,GetUserByID,
    UpdateUserData,deleteUser,changeRoleUser,LoginUser
};