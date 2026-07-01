import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100).required(),

    description: Joi.string().allow("").optional(),

    completed: Joi.boolean().optional(),
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().trim().min(3).max(100),

    description: Joi.string().allow(""),

    completed: Joi.boolean(),
}).min(1);