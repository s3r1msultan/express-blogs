import { Router } from "express";
import {
  addComment,
  blogDelete,
  blogGet,
  blogPost,
  blogPut,
  blogsGet,
} from "../controllers/blogsHandler.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { user } from "../controllers/signInHandler.js";

const blogsRoute = Router();

blogsRoute.get("/post", isAdmin, (req, res) => {
  res.render("post", {
    user: user,
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
  });
});
blogsRoute.get("/", blogsGet);
blogsRoute.get("/:id", blogGet);
blogsRoute.post("/:id/comments", addComment);
blogsRoute.post("/", isAdmin, blogPost);
blogsRoute.put("/:id", isAdmin, blogPut);
blogsRoute.delete("/:id", isAdmin, blogDelete);

export default blogsRoute;
