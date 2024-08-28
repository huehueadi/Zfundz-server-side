import { check } from "express-validator";

 export const registerValidator = [
    check('fullName')
    .not()
    .isEmpty()
    .withMessage('Full Name is required'),

  check('email')
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail({ gmail_remove_dots: true }),

  check('mobile')
    .not()
    .isEmpty()
    .withMessage('Mobile number is required')
    .isMobilePhone()
    .withMessage('Please include a valid mobile number'),

  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'), 
];

 export const loginValidator  = [
    check('email')
    .isEmail()
    .withMessage('Please include a valid email')
    .normalizeEmail({ gmail_remove_dots: true }),

    check('password')
    .not()
    .isEmpty()
    .withMessage('Please enter the valid password')

];
// export const propertyValidator = [
//   body('propertyName')
//     .notEmpty().withMessage('Property name is required')
//     .isString().withMessage('Property name must be a string'),

//   body('propertyType')
//     .notEmpty().withMessage('Property type is required')
//     .isString().withMessage('Property type must be a string'),

//   body('propertyAddress')
//     .notEmpty().withMessage('Property address is required')
//     .isString().withMessage('Property address must be a string'),

//   body('marketValue')
//     .notEmpty().withMessage('Market value is required')
//     .isNumeric().withMessage('Market value must be a number')
// ];

// export const propertyValidater = [
      
//   body('PropertyName')
// ]

