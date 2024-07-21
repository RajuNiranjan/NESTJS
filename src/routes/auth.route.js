import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

export const AuthRouter = express.Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/signin", signIn);
