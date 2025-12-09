import Joi from 'joi';

export const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(120).required(),
  description: Joi.string().allow('', null),
  ownerId: Joi.string().required()
});

export const updateProjectSchema = Joi.object({
  name: Joi.string().min(3).max(120).optional(),
  description: Joi.string().allow('', null).optional()
});
