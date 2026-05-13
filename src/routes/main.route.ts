import { Router } from "express";
import { AuthGuard } from "../app/middlewares/auth.middleware";
import auth from "./auth.route";
import users from "./users.route";
import profile from "./profile.route";

const router = Router();
router.use("/auth", auth);

router.use("/users", AuthGuard, users);
router.use("/profile", AuthGuard, profile);

export default router;
