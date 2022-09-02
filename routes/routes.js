import express from "express";
import {
  createUser,
  addUserExercises,
  getUserLogs,
} from "../controllers/user.js";

const router = express.Router();

router.post("/api/users", createUser);
router.post("/api/users/:_id/exercises", addUserExercises);
router.get("/api/users/:_id/logs", getUserLogs);

export default router;
