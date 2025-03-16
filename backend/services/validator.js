const Joi = require('joi');

const actionSchema = Joi.string().min(3).max(10).pattern(/^[a-zA-Z]*$/).required()
  .messages({
    'string.base': `"action" must be a string`,
    'string.min': `"action" must be at least 3 characters long`,
    'string.max': `"action" must be less than or equal to 10 characters long`,
    'string.pattern.base': `"action" contains invalid characters`,
    'any.required': `"action" is required`
  });

const idSchema = Joi.string().length(24).pattern(/^[a-fA-F0-9]{24}$/).required()
  .messages({
    'string.base': `"id" must be a string`,
    'string.length': `invalid "id"`,
    'string.pattern.base': `invalid "id"`,
    'any.required': `"id" is required`
  }); 

const descSchema = Joi.string().min(1).max(5000).pattern(/^[a-zA-Z0-9\s,.'-]*$/).required()
  .messages({
    'string.base': `"description" must be a string`,
    'string.min': `"description" must be at least 1 characters long`,
    'string.max': `"description" must be less than or equal to 5000 characters long`,
    'string.pattern.base': `"description" contains invalid characters`,
    'any.required': `"description" is required`
  });

  const searchSchema = Joi.string().min(0).max(5000).pattern(/^[a-zA-Z0-9\s,.'-]*$/).required()
  .messages({
    'string.base': `"description" must be a string`,
    'string.max': `"description" must be less than or equal to 5000 characters long`,
    'string.pattern.base': `"description" contains invalid characters`,
    'any.required': `"description" is required`
  });  

const dateSchema = Joi.date().iso().required()
  .messages({
    'date.base': `"end_date" must be a valid date`,
    'date.format': `"end_date" must follow the ISO date format (YYYY-MM-DD)`,
    'any.required': `"end_date" is required`
  });

const booleanSchema = Joi.boolean().required()
  .messages({
    'boolean.base': `"completed" must be a boolean value`,
    'any.required': `"completed" is required`
  });

function createTask(req){
    const fields = [
      { schema: descSchema, value: req.body.description },
      { schema: dateSchema, value: req.body.end_date }
    ];

  fields.forEach(({ schema, value }) => {
    const { error } = schema.validate(value);
    if (error) throw new TypeError(error.details[0].message);
  });
}

function actionTask(req){
  const fields = [
    { schema: idSchema, value: req.params.id},
    { schema: actionSchema, value: req.body.action}
  ];

fields.forEach(({ schema, value }) => {
  const { error } = schema.validate(value);
  if (error) throw new TypeError(error.details[0].message);
});
}

function deleteTask(req){
  const { error } = idSchema.validate(req.params.id);
  if (error) throw new TypeError(error.details[0].message);
}
  
function updateTask(req){
  const fields = [
    { schema: idSchema, value: req.params.id},
    { schema: descSchema, value: req.body.description },
    { schema: dateSchema, value: req.body.end_date }
  ];

fields.forEach(({ schema, value }) => {
  const { error } = schema.validate(value);
  if (error) throw new TypeError(error.details[0].message);
});
}

function searchTask(req){
  const { error } = searchSchema.validate(req.body.description);
  if (error) throw new TypeError(error.details[0].message);
}

module.exports = {
  createTask, actionTask, deleteTask, updateTask, searchTask
};
