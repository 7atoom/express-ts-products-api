import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {httpStatusText} from "../utils/httpStatusText";
import authService from '../services/auth.service';

const Register = asyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: {
            user,
            accessToken,
            refreshToken
        }
    });
});

const Login = asyncHandler(async (req: Request, res: Response) => {
    const { user, accessToken, refreshToken } = await authService.login(req.body);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
            user,
            accessToken,
            refreshToken
        }
    });
});

const RefreshTokens = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const tokens = authService.refreshTokens(refreshToken);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: tokens
    });
});

export default {
    Register,
    Login,
    RefreshTokens
};