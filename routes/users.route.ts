import express from "express";
import usersController from "../controllers/users.controller";
import { validateUser, validatePartialUser } from "../validation/user.validator";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.route('/')
    .get(authenticate, usersController.GetAllUsers)
    .post(validateUser, usersController.CreateUser);

router.route('/:id')
    .get(authenticate, usersController.GetUserById)
    .patch(authenticate, validatePartialUser, usersController.UpdateUser)
    .put(authenticate, validatePartialUser, usersController.UpdateUser)
    .delete(authenticate, usersController.DeleteUser);

export default router;
