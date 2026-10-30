
import expressAsyncHandler from "express-async-handler";

import {
    createTask,
    deleteTask,
    updateTask,
    changeStatus,
    changepriority,
    getAllTasksByUser,
    getAllTasksByAdmin,
    getTasksService
} from "../services/task.service.js";

// POST: Create task
const createTaskController = expressAsyncHandler(async (req, res) => {
    const task = await createTask({
        ...req.body,
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        data: task
    });
});

// get all tassk by feltering

const getTasks = expressAsyncHandler(async (req, res) => {
  const result = await getTasksService(
    req.user._id,
    req.query
  );

  res.status(200).json({
    success: true,
    ...result,
  });
});

// DELETE: Delete task
const deleteTaskController = expressAsyncHandler(async (req, res) => {
    const task = await deleteTask(req.params.id);

    res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: task
    });
});

// PATCH: Update task
const updateTaskController = expressAsyncHandler(async (req, res) => {
    const task = await updateTask(req.params.id, req.body);

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json({
        success: true,
        data: task
    });
});

// PATCH: Change task status
const changeStatusController = expressAsyncHandler(async (req, res) => {
    const task = await changeStatus(req.params.id, req.body.status);

    res.status(200).json({
        success: true,
        data: task
    });
});

// PATCH: Change task priority
const changePriorityController = expressAsyncHandler(async (req, res) => {
    const task = await changepriority(req.params.id, req.body.priority);

    res.status(200).json({
        success: true,
        data: task
    });
});

// GET: Get current user's tasks
const getAllTasksByUserController = expressAsyncHandler(async (req, res) => {
    const tasks = await getAllTasksByUser({
        user: req.user.id
    });

    res.status(200).json({
        success: true,
        results: tasks.length,
        data: tasks
    });
});

// GET: Admin gets all tasks
const getAllTasksByAdminController = expressAsyncHandler(async (req, res) => {
    const tasks = await getAllTasksByAdmin();

    res.status(200).json({
        success: true,
        results: tasks.length,
        data: tasks
    });
});

export {
    createTaskController,
    deleteTaskController,
    updateTaskController,
    changeStatusController,
    changePriorityController,
    getAllTasksByUserController,
    getAllTasksByAdminController,
    getTasks
};
