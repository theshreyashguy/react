import Joi, { ObjectSchema } from 'joi';

const orderSchema: ObjectSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required'
  }),
  orderId: Joi.string().messages({
    'string.base': 'User ID must be a string',
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required'
  }),
  paymentId: Joi.string().messages({
    'string.base': 'User ID must be a string',
    'string.empty': 'User ID is required',
    'any.required': 'User ID is required'
  }),
  items: Joi.array().items(
    Joi.object({
      coffeeId: Joi.number().required().messages({
        'number.base': 'Coffee ID must be a number',
        'any.required': 'Coffee ID is required'
      }),
      quantity: Joi.number().required().messages({
        'number.base': 'Quantity must be a number',
        'any.required': 'Quantity is required'
      })
    })
  ).required().messages({
    'array.base': 'Items must be an array',
    'any.required': 'Items are required'
  }),
  totalAmount: Joi.number().required().messages({
    'number.base': 'Total amount must be a number',
    'any.required': 'Total amount is required'
  }),
  orderDate: Joi.date().default(() => new Date()).messages({
    'date.base': 'Order date must be a valid date'
  })
});

export { orderSchema };
