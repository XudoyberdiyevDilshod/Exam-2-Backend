import { read, write } from "../utils/model.js";

const GET = (req, res, next) => {
  try {
    const posts = read("posts");

    res.status(200).json({
      status: 200,
      message: "success",
      data: posts,
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  GET,
};
