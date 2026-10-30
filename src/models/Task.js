
import mongoose from "mongoose";

const TaskSchema=mongoose.Schema({
    title:{
      type:String,
      required:true,
      max:30
    },
    description:{
      type:String,
      required:true,
      
    },
     status: {
        type: String,
        enum: ["pending", "in-progress","completed"],
        default: "pending",
  },
    priority: {
        type: String,
        enum: ["high", "medium","low"],
        default: "low",
        
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

},{
    timestamps: true
})
const Task=mongoose.model("Task",TaskSchema);
export default Task;
