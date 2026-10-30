
import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    name:{
      type:String,
      required:true,
      min:2,
      max:25
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password:{
       type:String,
       min:4,
       max:16,
       required:true
    },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

},{
  timestamps: true
})
const User=mongoose.model("User",UserSchema);
export default User;
