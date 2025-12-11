import express from "express";
import {authMiddleware} from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import billController from "../controller/bill-controller.js";
import kegiatanController from "../controller/kegiatan-controller.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);

userRouter.get('/api/users/current', userController.getUser);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/current', userController.logout);
//

userRouter.post('/api/kegiatan', billController.createKegiatan)
userRouter.post('/api/kegiatan/:kegiatanId/participant', billController.addParticipants)
userRouter.get('/api/kegiatan/:kegiatanId/participants',billController.getAllParticipant)


userRouter.post('/api/kegiatan/:kegiatanId/participant/:participantId/item', billController.addItem)
userRouter.get('/api/kegiatan/:kegiatanId/participant/:participantId/items', billController.getAllItems)


//api result
userRouter.get('/api/kegiatan/:kegiatanId/summary',kegiatanController.summary)

export {
    userRouter
}