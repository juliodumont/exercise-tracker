import mongoose from "mongoose";
import User from "../models/user.js";
import Exercise from "../models/exercise.js";
import { getValidDate } from "../utils/check.js";

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json([users]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUserExercises = async (req, res) => {
  const userId = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send("No user with that id");
  const user = await User.findById(userId);

  const exercise = {
    username: user.username,
    ...req.body,
    date: getValidDate(req.body.date),
  };
  const newExercise = new Exercise(exercise);
  try {
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUserLogs = async (req, res) => {};
