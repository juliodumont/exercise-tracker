import mongoose from "mongoose";

const logSchema = mongoose.Schema({
  username: String,
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: Date,
    },
  ],
});

const Log = mongoose.model("Log", logSchema);