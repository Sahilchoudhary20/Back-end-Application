import Joi from 'joi';

export const createCommentSchema = Joi.object({
  resourceType: Joi.string().valid('project', 'task').required(),
  resourceId: Joi.string().required(),
  authorId: Joi.string().required(),
  text: Joi.string().min(1).required()
});
