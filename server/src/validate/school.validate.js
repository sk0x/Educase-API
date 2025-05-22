import {body, query} from 'express-validator';

export const newSchoolReqSchema =  [
     body('name')
        .notEmpty()
        .withMessage('School name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('School name must be between 3 and 100 characters')
        .trim(),

    body('address')
        .notEmpty()
        .withMessage('Address is required')
        .isLength({ min: 5, max: 255 })
        .withMessage('Address must be between 5 and 255 characters')
        .trim(),

    body('longitude')
        .notEmpty()
        .withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be a valid number between -180 and 180'),

    body('latitude')
        .notEmpty()
        .withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be a valid number between -90 and 90')
]

export const listSchoolsReqSchema = [
    query('longitude')
        .notEmpty()
        .withMessage('User longitude is required')
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude must be a valid float number between -180 and 180')
        .toFloat(),

    query('latitude')
        .notEmpty()
        .withMessage('User latitude is required')
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude must be a valid float number between -90 and 90')
        .toFloat(),
]


