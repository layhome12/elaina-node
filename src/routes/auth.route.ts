import { Router } from "express";
import { AuthController } from "../app/controllers/auth.controller";
import { ZodValidator } from "../app/middlewares/zod.middleware";
import { AuthRequest } from "../app/requests/auth.request";
import { reAuthGuard } from "../app/middlewares/reauth.middleware";

const router = Router();

router.post("/", ZodValidator(AuthRequest), AuthController.index);
router.get("/refresh", reAuthGuard(), AuthController.refresh);
router.get("/logout", AuthController.logout);

export default router;
