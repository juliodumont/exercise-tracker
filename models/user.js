import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: String,
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
