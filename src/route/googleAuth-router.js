import express from "express";

import googleAuthController from "../controller/googleAuthController.js";


const googleAuthRouter = new express.Router();

googleAuthRouter.get('/auth/google',googleAuthController.googleAuthRedirect)

googleAuthRouter.get('/auth/google/callback',googleAuthController.googleAuthCallback)

export {
    googleAuthRouter
}