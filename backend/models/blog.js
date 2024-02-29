import { Schema, model } from "mongoose";
import { isEmptyString } from "./validator.js";

const commentSchema = new Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const blogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, validate: isEmptyString },
    url_imgs: { type: Array },
    author: { type: String, required: true, validate: isEmptyString },
    content: { type: String, required: true, validate: isEmptyString },
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now(), immutable: true },
    modifiedAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date },
  },
  { collection: "blogs" }
);

export const Blog = model("Blog", blogSchema);
