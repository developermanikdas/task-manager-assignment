import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";

export const createTask = async (req, res, next) => {
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
        next(error);
    }
};

export const getAllTasks = async (req, res, next) => {
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
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
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

        Object.assign(task, req.body);

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task,
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

            throw new ApiError(403, "Access denied. You can only delete your own tasks.");
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