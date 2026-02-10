import express from "express";
import authController from "../controllers/auth.controller";
import { validateLogin, validateRefreshToken } from "../validation/auth.validator";
import { validateUser } from "../validation/user.validator";

const router = express.Router();

router.post('/register', validateUser, authController.Register);
router.post('/login', validateLogin, authController.Login);
router.post('/refresh-tokens', validateRefreshToken, authController.RefreshTokens);

export default router;
