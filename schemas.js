const Joi = require('joi')
// if (!req.body.entry) throw new ExpressError('Invalid Entry Data', 400) //if we have an error we throw an ExpressError, our catchAsync will then throw it to be caught by next
module.exports.entrySchema = Joi.object({
    entry: Joi.object({
        date_num: Joi.required(),
        date: Joi.string(),
        subject: Joi.string().required(),
        body: Joi.string().required(),
        rating: Joi.string().required(),
        tag: Joi.string().required()
    }).required()
})