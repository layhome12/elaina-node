import { Router } from "express";
import { UsersController } from "../app/controllers/users.controller";
import { ZodValidator } from "../app/middlewares/zod.middleware";
import {
  UserCreateRequest,
  UserUpdateRequest,
} from "../app/requests/users.request";

const router = Router();

router.get("/", UsersController.index);
router.get("/:id", UsersController.show);
router.post("/", ZodValidator(UserCreateRequest), UsersController.store);
router.put("/:id", ZodValidator(UserUpdateRequest), UsersController.update);
router.delete("/:id", UsersController.destroy);

export default router;
