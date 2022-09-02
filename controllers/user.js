import mongoose from "mongoose";
import User from "../models/user.js";

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json({ username: newUser.username, _id: newUser._id });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-exercises");
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUserExercises = async (req, res) => {
  const userId = req.params._id;
  const userInfo = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send("No user with that id");

  const newExercise = {
    description: userInfo.description,
    duration: parseInt(userInfo.duration),
    date: userInfo.date
      ? new Date(userInfo.date).toDateString()
      : new Date(Date.now()).toDateString(),
  };

  try {
    const user = await User.updateOne(
      { _id: userId },
      { $push: { exercise: newExercise } }
    );
    const updatedUser = await User.findById(userId);
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date,
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUserLogs = async (req, res) => {
  const userId = req.params._id;
  const { from, to, limit } = req.query;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send("No user with that id");

  const user = await User.findById(userId);
  const log = user.exercises
    .filter((exercise) => {
      const date = new Date(exercise.date).getTime();
      const fromDate =
        from !== undefined ? new Date(from).getTime() : new Date(0).getTime();
      const toDate =
        to !== undefined ? new Date(to).getTime() : new Date().getTime();

      return date >= fromDate && date <= toDate;
    })
    .slice(0, limit ?? user.exercises.length);

  res.json({
    _id: user._id,
    username: user.username,
    count: log.length,
    log,
  });
};
