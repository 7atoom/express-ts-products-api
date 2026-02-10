import {Request, Response} from 'express';
import asyncHandler from 'express-async-handler';
import {httpStatusText} from "../utils/httpStatusText";
import {userService} from "../services/users.service";

const GetAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await userService.getAll();
    res.status(200)
        .json({
            status: httpStatusText.SUCCESS,
            results: users.length,
            data: users
        });
});

const GetUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getById(req.params.id as string);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: user
    });
});

const CreateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.create(req.body);
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        data: user
    });
});

const UpdateUser = asyncHandler(async (req: Request, res: Response) => {
    const updatedFields = req.body;
    const user = await userService.update(req.params.id as string, updatedFields);
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: user
    });
});

const DeleteUser = asyncHandler(async (req: Request, res: Response) => {
    await userService.delete(req.params.id as string);
    res.status(204).send({
        status: httpStatusText.SUCCESS,
        message: 'User deleted successfully'
    });
});

export default {
    GetAllUsers,
    GetUserById,
    CreateUser,
    UpdateUser,
    DeleteUser
};




