import express from "express";
import { createUser } from "../controllers/controllers.js";

const router = express.Router();

router.post("/", createPost);

export default router;
