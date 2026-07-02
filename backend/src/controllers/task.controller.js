import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";

export const createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find().populate("createdBy", "name email");
        } else {
            tasks = await Task.find({ createdBy: req.user.id });
        }

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
           throw new ApiError(404, "Task not found");
        }

        if (
            req.user.role !== "admin" &&
            task.createdBy.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const updateTask = async (req, res) => {
    try {



        const task = await Task.findById(req.params.id);

        if (!task) {
         throw new ApiError(404, "Task not found");
        }

        if (
            req.user.role !== "admin" &&
            task.createdBy.toString() !== req.user.id
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        Object.assign(task, req.body);

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Optional: prevent users from deleting others' tasks
    if (
      task.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};