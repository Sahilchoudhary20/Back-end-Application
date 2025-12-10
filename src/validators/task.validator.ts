import Joi from 'joi';

export const createTaskSchema = Joi.object({
  projectId: Joi.string().required(),
  title: Joi.string().min(1).required(),
  description: Joi.string().allow('', null),
  assigneeId: Joi.string().optional(),
  status: Joi.string().valid('todo', 'in-progress', 'done').optional()
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  assigneeId: Joi.string().optional(),
  status: Joi.string().valid('todo', 'in-progress', 'done').optional()
});
