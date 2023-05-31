import { read, write } from "../utils/model.js";
import { resolve } from "path";
import moment from "moment/moment.js";
import { InternalServerError, NotFoundError } from "../utils/errors.js";
import { unlinkSync } from "fs";

// create PostController GET
const GET = (req, res, next) => {
  try {
    const posts = read("posts");
    res.status(200).json({ status: 200, message: "success", data: posts });
  } catch (error) {
    return next(new InternalServerError(500, "InternalServerError"));
  }
};

// create PostController POST

const POST = (req, res, next) => {
  try {
    const posts = read("posts");
    const {
      date,
      time,
      course,
      specialist,
      type,
      link,
      user_full_name,
      user_proffesion,
      user_phone,
      user_additional_number,
      post_description,
      post_text,
    } = req.body;
    const { post_image } = req.files;

    console.log(post_image);

    const newPost = {
      post_id: posts.at(-1).post_id + 1 || 1,
      time_and_direction: {
        date,
        time,
        course,
        specialist,
        type,
        link,
      },
      advertiser: {
        user_full_name,
        user_proffesion,
        user_phone,
        user_additional_number,
      },
      post_description,
      post_image: Date.now() + post_image.name.replace(/\s/g, ""),
      post_text,
    };

    post_image.mv(resolve("uploads", post_image.name));

    posts.push(newPost);
    write("posts", posts);
    res.status(201).json({
      status: 201,
      message: "success",
      data: newPost,
    });
  } catch (error) {
    return next(new InternalServerError(500, "InternalServerError"));
  }
};

export default {
  GET,
  POST,
};
