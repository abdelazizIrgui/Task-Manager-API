import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import {createUser,getAllUsers,GetUserByID,
    UpdateUserData,deleteUser,changeRoleUser,LoginUser
} from "../services/user.service.js";

const controllercreateUser=expressAsyncHandler(async(req,res)=>{
    
    const {name,email,password}=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    const user= await createUser({
        name,
        email,
        password:passwordHash 
    });
    res.status(201).json(user);
})

const controllerLoginUser=expressAsyncHandler(async(req,res)=>{
  const user=await LoginUser(req.body);
  res.status(200).json({
    data:user
  })
})

const controllerGetAllUsers=expressAsyncHandler(async(req,res)=>{
    const users = await getAllUsers();

    res.status(200).json({
        success: true,
        results: users.length,
        data: users
    });
})

const controllerGetUserByID=expressAsyncHandler(async(req,res)=>{
     const id=await req.params.id;
     const user=await GetUserByID(id);
     if(!user){
        throw new Error("user not found")
     }
     res.status(200).json({
        data:user
     })
     
})

const controllerUpdateUserData=expressAsyncHandler(async(req,res)=>{
    const id=await req.params.id;
     const {name,email,password}=await req.body;
     const passwordHash=await bcrypt.hash(password,10);
     const user=await UpdateUserData(id,{name,email,password:passwordHash});

  res.status(200).json({
    success: true,
    data: user
  });
     
})
const controllerdeleteUser=expressAsyncHandler(async(req,res)=>{
   
   const user = await deleteUser(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
})

const controllerchangeRoleUser = expressAsyncHandler(
  async (req, res) => {
    const user = await changeRoleUser(req.params.id);

    res.status(200).json({
      success: true,
      data: user
    });
  }
);
export {controllercreateUser,controllerGetAllUsers,
    controllerGetUserByID,
    controllerUpdateUserData,controllerdeleteUser,controllerchangeRoleUser,controllerLoginUser
};