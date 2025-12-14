import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from "../middleware/error-middleware.js";

dotenv.config();

export const web = express();

web.use(express.json());
web.use(cookieParser());
web.use(cors());

web.get("/", (req, res) => {
  res.status(200).send("API is running");
});

// import {googleAuthRouter} from "../route/googleAuth-router.js";
// import {publicRouter} from "../route/public-api.js";
// import {userRouter} from "../route/api.js";

// web.use(googleAuthRouter)
// web.use(publicRouter)
// web.use(userRouter)

web.use(errorMiddleware);
