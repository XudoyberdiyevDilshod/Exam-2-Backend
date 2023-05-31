import { Router } from "express";
import postController from "../controller/post.controller.js";
import validate from "../middleware/validate.js";
import checkToken from "../middleware/checkToken.js";

const router = Router();

router.get("/posts", checkToken, postController.GET);

router.post("/posts", validate, postController.POST);

router.delete("/posts/:post_id", postController.DELETE);

export default router;
