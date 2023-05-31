import { Router } from "express";
import postController from "../controller/post.controller.js";
import validate from "../middleware/validate.js";
import checkToken from "../middleware/checkToken.js";

const router = Router();

router.get("/posts", checkToken, postController.GET);

router.post("/posts", checkToken, validate, postController.POST);

router.delete("/posts/:post_id", postController.DELETE);

router.put("/posts/:post_id", validate, postController.PUT);

export default router;
