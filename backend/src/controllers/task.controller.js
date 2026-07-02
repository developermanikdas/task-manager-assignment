import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";

export const createTask = async (req, res, next) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user.id,
        });

        const populatedTask = await Task.findById(task._id)
            .populate("createdBy", "name email");

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: populatedTask,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllTasks = async (req, res, next) => {
    try {
        let tasks;

        if (req.user.role === "admin") {
            tasks = await Task.find()
                .populate("createdBy", "name email");
        } else {
            tasks = await Task.find({
                createdBy: req.user.id,
            }).populate("createdBy", "name email");
        }

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        if (
            req.user.role !== "admin" &&
            task.createdBy._id.toString() !== req.user.id
        ) {
            throw new ApiError(403, "Access denied");
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        if (
            req.user.role !== "admin" &&
            task.createdBy.toString() !== req.user.id
        ) {
            throw new ApiError(403, "Access denied");
        }

        task.title = req.body.title;
        task.description = req.body.description;
        task.completed = req.body.completed;

        await task.save();

        const populatedTask = await Task.findById(task._id)
            .populate("createdBy", "name email");

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: populatedTask,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            throw new ApiError(404, "Task not found");
        }

        if (
            req.user.role !== "admin" &&
            task.createdBy.toString() !== req.user.id
        ) {
            throw new ApiError(
                403,
                "Access denied. You can only delete your own tasks."
            );
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};