import joi from 'joi'
import { Types } from 'mongoose'

const validateObjectId = (value, helper) => {
    return Types.ObjectId.isValid(value) ? true : helper.message('In-valid objectId')
}
export const generalFields = {

    email: joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ['com', 'net'] }
    }).required(),
    password: joi.string(),
    cPassword: joi.string().required(),
    id: joi.string().custom(validateObjectId).required(),
    name: joi.string().required(),
    file: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required()
    })
}

export const validation = (schema ,considerHeaders = false) =>{
    return (req,res,next) =>{
    let dataFromAllMethods = {...req.body,...req.params ,...req.query}
        if (req.file || req.files) {
            dataFromAllMethods.file = req.file ||req.files
        }
        if (req.headers.authorization && considerHeaders) {
            dataFromAllMethods ={authorization: req.headers.authorization}
        }
        const validationResult = schema.validate(dataFromAllMethods , { abortEarly: true})
            if (validationResult.error) {
                return res.status(400).json({message:validationResult.error.message})
            }
      
            return next()
}
}