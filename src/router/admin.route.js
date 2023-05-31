import { Router } from "express";
import adminController from "../controller/admin.controller.js";

const router = Router();

router.post("/login", adminController.LOGIN);
router.get("/login", adminController.GET);

export default router;
