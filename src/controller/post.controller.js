import { read, write } from "../utils/model.js";
import { resolve } from "path";
import { InternalServerError, NotFoundError } from "../utils/errors.js";
import { unlinkSync } from "fs";

// create PostController GET
const GET = (req, res, next) => {
  try {
    const posts = read("posts");
    const post = posts.filter((post) => post.isActive == "true");
    res.status(200).json({ status: 200, message: "success", data: post });
  } catch (error) {
    return next(new InternalServerError(500, "InternalServerError"));
  }
};

// create PostController GET_BY_ID

const GET_BY_ID = (req, res, next) => {
  try {
    const posts = read("posts");
    const { post_id } = req.params;

    const post = posts.filter((post) => post.post_id == post_id);
    res.status(200).json({ status: 200, message: "success", data: post });
  } catch (error) {
    return next(new InternalServerError(500, "InternalServerError"));
  }
};

const FILTER_BY_SEARCH = (req, res, next) => {
  try {
    const posts = read("posts");

    const { date, course, type, user_full_name } = req.query;

    const filterpost = posts.filter((post) => {
      const byDate = date ? post.time_and_direction.date.includes(date) : true;
      const byCourse = course ? post.time_and_direction.course.includes(course) : true;
      const byType = type ? post.time_and_direction.type.includes(type) : true;
      const byFullName = user_full_name ? post.advertiser.user_full_name.includes(user_full_name) : true;

      return byDate && byCourse && byType && byFullName;
    });

    const post = filterpost.filter((post) => post.isActive == "true");
    res.status(200).json({
      status: 200,
      message: "success",
      data: post,
    });
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
      isActive,
    } = req.body;
    const { post_image } = req.files;

    console.log(post_image);

    const imageName = Date.now() + post_image.name.replace(/\s/g, "");

    const newPost = {
      post_id: posts.at(-1).post_id + 1 || 1,
      post_description,
      post_image: imageName,
      post_text,
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
      isActive,
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

// create PostController DELETE

const DELETE = (req, res, next) => {
  try {
    const posts = read("posts");
    const { post_id } = req.params;
    console.log(post_id);
    const postIndex = posts.findIndex((post) => post.post_id == post_id);
    if (postIndex == -1) {
      return next(new NotFoundError(404, "post not found"));
    }
    const [deletedPost] = posts.splice(postIndex, 1);

    console.log(deletedPost);
    unlinkSync(resolve("uploads", deletedPost.post_image));

    write("posts", posts);
    res.status(200).json({
      status: 200,
      message: "success",
      data: deletedPost,
    });
  } catch (error) {
    return next(new InternalServerError(500, "InternalServerError"));
  }
};

// create PostController PUT

const PUT = (req, res, next) => {
  try {
    const posts = read("posts");
    const { post_id } = req.params;

    const post = posts.find((post) => post.post_id == post_id);

    if (!post) {
      return next(new NotFoundError(404, "post not found"));
    }

    console.log(post.isActive);

    post.isActive = req.body.isActive || post.isActive;

    write("posts", posts);
    res.status(200).json({
      status: 200,
      message: "success",
      data: post,
    });
  } catch (error) {
    return next(new InternalServerError(500, "InternalServerError"));
  }
};

export default {
  GET,
  GET_BY_ID,
  POST,
  DELETE,
  PUT,
  FILTER_BY_SEARCH,
};
