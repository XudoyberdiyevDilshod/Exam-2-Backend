import Joi from "joi";

export const LoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const PostCreateSchema = Joi.object({
  post_description: Joi.string().min(10).required(),
  post_image: Joi.string()
    .pattern(new RegExp("((jpg|png|gif|bmp))$"))
    .required(),
  post_text: Joi.string().min(10).required(),
  date: Joi.date().iso().min("2023-01-01").max("2023-12-31").required(),
  time: Joi.string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
    .required(),
  course: Joi.string().min(4).required(),
  specialist: Joi.string().min(4).required(),
  type: Joi.string().min(4).required(),
  link: Joi.string()
    .regex(/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/.*)?$/)
    .required(),
  user_full_name: Joi.string().min(4).max(32).required(),
  user_proffesion: Joi.string().min(4).max(32).required(),
  user_phone: Joi.string()
    .pattern(/^(\+998|0)[1-9]\d{8}$/)
    .required(),
  user_additional_number: Joi.string()
    .pattern(/^(\+998|0)[1-9]\d{8}$/)
    .required(),
});
