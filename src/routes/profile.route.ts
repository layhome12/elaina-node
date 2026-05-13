import { Router } from "express";
import { ProfileController } from "../app/controllers/profile.controller";
import { ZodValidator } from "../app/middlewares/zod.middleware";
import { ProfileRequest } from "../app/requests/profile.request";

const router = Router();

router.get("/", ProfileController.index);
router.put("/", ZodValidator(ProfileRequest), ProfileController.update);

export default router;
