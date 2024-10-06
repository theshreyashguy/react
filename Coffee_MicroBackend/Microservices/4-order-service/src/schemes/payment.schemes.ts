import Joi, { ObjectSchema } from 'joi';

const paymentSchema: ObjectSchema = Joi.object({
  paymentId: Joi.string().required().messages({
    'string.base': 'Payment ID must be a string',
    'string.empty': 'Payment ID is required',
    'any.required': 'Payment ID is required'
  }),
  orderId: Joi.string().required().messages({
    'string.base': 'Order ID must be a string',
    'string.empty': 'Order ID is required',
    'any.required': 'Order ID is required'
  }),
  amount: Joi.number().required().messages({
    'number.base': 'Amount must be a number',
    'any.required': 'Amount is required'
  }),
  paymentDate: Joi.date().default(() => new Date()).messages({
    'date.base': 'Payment date must be a valid date'
  }),
  status: Joi.string().valid('Pending', 'Completed', 'Failed').required().messages({
    'string.base': 'Status must be a string',
    'any.only': 'Status must be one of Pending, Completed, or Failed',
    'any.required': 'Status is required'
  })
});

export { paymentSchema };
