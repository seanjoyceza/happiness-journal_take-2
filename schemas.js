const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)


// if (!req.body.entry) throw new ExpressError('Invalid Entry Data', 400) //if we have an error we throw an ExpressError, our catchAsync will then throw it to be caught by next
module.exports.entrySchema = Joi.object({
    entry: Joi.object({
        date_num: Joi.required(),
        date: Joi.string().escapeHTML(),
        subject: Joi.string().required().escapeHTML(),
        body: Joi.string().required().escapeHTML(),
        rating: Joi.string().required().escapeHTML(),
        tag: Joi.string().required().escapeHTML()
    }).required()
})