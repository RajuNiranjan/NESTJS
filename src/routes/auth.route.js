import express from "express";
import { signIn } from "../controllers/auth.controller.js";

export const AuthRouter = express.Router();

AuthRouter.post("/signup", signIn);
