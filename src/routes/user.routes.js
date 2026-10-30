
import express from "express";
import {controllercreateUser,controllerGetAllUsers,
    controllerGetUserByID,
    controllerUpdateUserData,controllerdeleteUser,controllerchangeRoleUser,controllerLoginUser
} from "../controllers/user.controller.js";
import {protect} from "../middlewares/protect.js";
import {allowTo} from "../middlewares/allowTo.js";
import {validate} from "../middlewares/validate.js";
import {createUserSchema} from "../validators/user.validator.js";
import {loginSchema} from "../validators/user.validator.js";
const router=express.Router();

router.post("/users",validate(createUserSchema),controllercreateUser);
router.post("/users/login",validate(loginSchema),controllerLoginUser);
router.get("/users",protect,allowTo("admin"),controllerGetAllUsers);
router.get("/users/:id",protect,allowTo("admin","user"),controllerGetUserByID);
router.put("/users/:id",protect,allowTo("admin","user"),controllerUpdateUserData);
router.delete("/users/:id",protect,allowTo("admin"),controllerdeleteUser);
router.patch("/users/:id",protect,allowTo("admin"),controllerchangeRoleUser);


export default router;