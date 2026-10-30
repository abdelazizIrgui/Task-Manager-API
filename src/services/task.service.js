
import mongoose from "mongoose";
import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

const ALLOWED_UPDATE_FIELDS = [
    "title",
    "description",
    "status",
    "priority"
];

const ensureValidId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        const error = new AppError("Invalid task ID");
        error.statusCode = 400;
        throw error;
    }
};

const ensureTaskExists = (task) => {
    if (!task) {
        const error = new AppError("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;
};

const filterTaskData = (data) => {
    const filteredData = {};

    for (const field of ALLOWED_UPDATE_FIELDS) {
        if (Object.hasOwn(data, field)) {
            filteredData[field] = data[field];
        }
    }

    return filteredData;
};

// Create task
const createTask = async (data) => {
    return await Task.create(data);
};

// Delete task
const deleteTask = async (id, userId = null) => {
    ensureValidId(id);

    const filter = { _id: id };

    if (userId !== null) {
        filter.user = userId;
    }

    const task = await Task.findOneAndDelete(filter);

    return ensureTaskExists(task);
};

// Update task
const updateTask = async (id, data, userId = null) => {
    ensureValidId(id);

    const filteredData = filterTaskData(data);

    if (Object.keys(filteredData).length === 0) {
        const error = new AppError("No valid fields provided for update");
        error.statusCode = 400;
        throw error;
    }

    const filter = { _id: id };

    if (userId !== null) {
        filter.user = userId;
    }

    const task = await Task.findOneAndUpdate(
        filter,
        { $set: filteredData },
        {
            new: true,
            runValidators: true
        }
    );

    return ensureTaskExists(task);
};

// Change task status
const changeStatus = async (id, status, userId = null) => {
    ensureValidId(id);

    const allowedStatuses = [
        "pending",
        "in-progress",
        "completed"
    ];

    if (!allowedStatuses.includes(status)) {
        const error = new AppError("Invalid task status");
        error.statusCode = 400;
        throw error;
    }

    const filter = { _id: id };

    if (userId !== null) {
        filter.user = userId;
    }

    const task = await Task.findOneAndUpdate(
        filter,
        { $set: { status } },
        {
            new: true,
            runValidators: true
        }
    );

    return ensureTaskExists(task);
};

// Change task priority
const changepriority = async (id, priority, userId = null) => {
    ensureValidId(id);

    const allowedPriorities = ["low", "medium", "high"];

    if (!allowedPriorities.includes(priority)) {
        const error = new AppError("Invalid task priority");
        error.statusCode = 400;
        throw error;
    }

    const filter = { _id: id };

    if (userId !== null) {
        filter.user = userId;
    }

    const task = await Task.findOneAndUpdate(
        filter,
        { $set: { priority } },
        {
            new: true,
            runValidators: true
        }
    );

    return ensureTaskExists(task);
};

// Get current user's tasks
const getAllTasksByUser = async (userId) => {
    const tasks = await Task.find({ user: userId }).sort({
        createdAt: -1
    });

    return tasks;
};

const getTasksService = async (userId, query) => {
  const {
    search,
    status,
    priority,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    order = "desc",
  } = query;

  // 1. Filter
  const filter = { user: userId };

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  // 2. Pagination
  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, Number(limit) || 10)
  );

  const skip = (currentPage - 1) * pageSize;

  // 3. Sorting
  const allowedSortFields = [
    "createdAt",
    "title",
    "status",
    "priority",
  ];

  const field = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const sortOrder = order === "asc" ? 1 : -1;

  // 4. Execute queries
  const [tasks, totalTasks] = await Promise.all([
    Task.find(filter)
      .sort({ [field]: sortOrder, _id: 1 })
      .skip(skip)
      .limit(pageSize),

    Task.countDocuments(filter),
  ]);

  return {
    data: tasks,
    pagination: {
      totalTasks,
      currentPage,
      totalPages: Math.ceil(totalTasks / pageSize),
      pageSize,
    },
  };
};

// Admin: get all tasks
const getAllTasksByAdmin = async () => {
    return await Task.find().sort({ createdAt: -1 });
};

export {
    createTask,
    deleteTask,
    updateTask,
    changeStatus,
    changepriority,
    getAllTasksByUser,
    getAllTasksByAdmin,
    getTasksService
};
