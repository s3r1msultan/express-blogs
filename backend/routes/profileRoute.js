import { Router } from "express";
import { user } from "../controllers/signInHandler.js";
import { Blog } from "../models/blog.js";

const profileRoute = Router();

profileRoute.get("/", (req, res) => {
  Blog.find({ "comments.author": user.username })
    .then((blogs) => {
      const userComments = [];
      blogs.forEach((blog) => {
        blog.comments.forEach((comment) => {
          if (comment.author === user.username) {
            userComments.push({
              blogTitle: blog.title,
              content: comment.content,
              createdAt: comment.createdAt,
            });
          }
        });
      });
      res.render("profile", {
        user: user,
        userComments: userComments,
        isVerified: req.signedCookies.isVerified,
        isLoggedIn: req.signedCookies.isLoggedIn,
        isAdmin: req.signedCookies.isAdmin,
        language: req.signedCookies.language,
      });
    })
    .catch((error) => {
      console.error("Error fetching user comments:", error);
    });
});
export { profileRoute };
