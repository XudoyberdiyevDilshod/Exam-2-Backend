import { LoginSchema, PostCreateSchema } from "../utils/validation.js";

export default (req, res, next) => {
  try {
    if (req.url === "/login" && req.method === "POST") {
      const { error } = LoginSchema.validate(req.body);
      if (error) throw Error(error);
    }

    if (req.url === "/posts" && req.method === "POST") {
      const { post_image } = req.files;
      const { error } = PostCreateSchema.validate({
        post_image: post_image.name,
        ...req.body,
      });
      if (error) throw Error(error);
    }
    next();
  } catch (error) {
    return next(error);
  }
};
