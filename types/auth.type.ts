import jwt from 'jsonwebtoken';

export interface IAuthPayload {
    userId: string;
    email: string;
}

export interface LoginData {
    email: string;
    password: string;
}