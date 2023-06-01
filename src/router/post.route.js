import { Router } from "express";
import postController from "../controller/post.controller.js";
import validate from "../middleware/validate.js";
import checkToken from "../middleware/checkToken.js";

const router = Router();

// Get Posts isActive
router.get("/posts", checkToken, postController.GET);

// Find post by ID
router.get("/posts/:post_id", postController.GET_BY_ID);


// filter Posts by date, course, type_course, user_full_name
router.get("/filterPosts", postController.FILTER_BY_SEARCH);


// Create Post by User
router.post("/posts", validate, postController.POST);


// Delete post by ID
router.delete("/posts/:post_id", checkToken, postController.DELETE);


// Put post by ID 
router.put("/posts/:post_id", checkToken, postController.PUT);

export default router;
