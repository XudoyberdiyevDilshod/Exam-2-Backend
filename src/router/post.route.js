import { Router } from "express";
import postController from "../controller/post.controller.js";

const router = Router();

router.get("/posts", postController.GET);

router.post("/posts", postController.POST);

router.delete("/posts/:post_id", postController.DELETE);


export default router;
