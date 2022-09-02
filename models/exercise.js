import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema(
  {
    username: String,
    description: String,
    duration: Number,
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
