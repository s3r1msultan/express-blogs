import { Schema, model } from "mongoose";
const user = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), immutable: true },
    modifiedAt: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verification_token: { type: String },
  },
  { collection: "users" }
);

export const User = model("User", user);
