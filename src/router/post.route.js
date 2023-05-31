import { Router } from "express";
import postController from "../controller/post.controller.js";

const router = Router();

router.get("/posts", postController.GET);

router.post("/posts", postController.POST);

export default router;
