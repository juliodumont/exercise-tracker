import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
});

const User = mongoose.model("User", userSchema);

export default User;
