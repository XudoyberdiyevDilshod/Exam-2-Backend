import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import checkToken from "../middleware/checkToken.js";
import validate from "../middleware/validate.js";

const router = Router();

router.post("/login", validate, adminController.LOGIN);
router.get("/login", checkToken, adminController.GET);

export default router;
