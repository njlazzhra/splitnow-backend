import express from 'express';
import cors from 'cors';
import {errorMiddleware} from "../middleware/error-middleware.js";
import dotenv from 'dotenv';
import {googleAuthRouter} from "../route/googleAuth-router.js";
import cookieParser from 'cookie-parser';
import {publicRouter} from "../route/public-api.js";
import {userRouter} from "../route/api.js";


export const web = express();
web.use(express.json());
web.use(cookieParser());
dotenv.config();

web.use(cors());
web.use(googleAuthRouter)
web.use(publicRouter)
web.use(userRouter)

web.use(errorMiddleware)