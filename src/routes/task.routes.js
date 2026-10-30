
import {
    createTaskController,
    deleteTaskController,
    updateTaskController,
    changeStatusController,
    changePriorityController,
    getAllTasksByUserController,
    getAllTasksByAdminController,
    getTasks
} from "../controllers/task.controller.js";
import express from "express";
const router=express.Router();
import { protect } from "../middlewares/protect.js";
import { allowTo } from "../middlewares/allowTo.js";
import {validate} from "../middlewares/validate.js";
import {createTaskSchema} from "../validators/task.validator.js"
import {UpdateTaskSchema} from "../validators/task.validator.js"

router.get("/tasks",protect,getTasks);
router.post("/tasks",protect,validate(createTaskSchema),createTaskController);
router.delete("/tasks/:id",protect,allowTo("admin"),deleteTaskController);
router.put("/tasks/:id",protect,allowTo("admin","user"),validate(UpdateTaskSchema),updateTaskController);
router.patch("/tasks/:id",protect,allowTo("admin","user"),changeStatusController);
router.patch("/tasks/:id",protect,allowTo("admin","user"),changePriorityController);
router.get("/tasks/:id",protect,allowTo("admin","user"),getAllTasksByUserController);
router.get("/tasks/:id",protect,allowTo("admin"),getAllTasksByAdminController);




export default router;