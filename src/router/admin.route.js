import { Router } from "express";
import adminController from "../controller/admin.controller.js";

const router = Router();

router.post("/login", adminController.LOGIN);

export default router;
