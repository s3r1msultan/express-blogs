import { Blog } from "../models/blog.js";
import axios from "axios";
import { user } from "./signInHandler.js";

export const blogsGet = async (req, res) => {
  const response = await axios.get('https://zenquotes.io/api/random').then(res => res);
  const quoteData = response.data[0];
  const quote = quoteData.q + " - " + quoteData.a;

  Blog.find()
    .then((blogs) => {
      res.status(200);

      res.render("blogs", {
        quote,
        blogs: blogs,
        title: "All blogs",
        isVerified: req.signedCookies.isVerified,
        isLoggedIn: req.signedCookies.isLoggedIn,
        isAdmin: req.signedCookies.isAdmin,
        language: req.signedCookies.language,
      });
    })
    .catch((err) => res.status(500).send(err));
};

export const blogGet = (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog is not found with id " + req.params.id,
        });
      }
      res.status(200);
      res.render("blog", {
        blog: blog,
        isVerified: req.signedCookies.isVerified,
        isLoggedIn: req.signedCookies.isLoggedIn,
        isAdmin: req.signedCookies.isAdmin,
        language: req.signedCookies.language,
      });
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

export const blogPut = (req, res) => {
  if (Array.isArray(req.body.url_imgs)) {
    req.body.url_imgs = req.body.url_imgs.map((url) => url.trim()).filter((url) => url !== "");
  }
  Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog is not found with id " + req.params.id,
          isLoggedIn: req.signedCookies.isLoggedIn,
          isAdmin: req.signedCookies.isAdmin,
          language: req.signedCookies.language,
        });
      }
      res.status(200).send(blog);
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

export const blogDelete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((blog) => {
      if (!blog) {
        return res.status(404).send({
          message: "Blog is not found with id " + req.params.id,
        });
      }
      res.status(200);
      res.redirect("/blogs");
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

export const blogPost = (req, res) => {
  if (req.body.url_imgs && typeof req.body.url_imgs === "string") {
    req.body.url_imgs = req.body.url_imgs.split(",").map((imgUrl) => imgUrl.trim());
  }
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.status(201);
      res.redirect("back");
    })
    .catch((err) => {
      console.error(err);
      res.status(400);
      res.redirect("back");
    });
};

export async function addComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const author = user.username;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send("Blog not found.");
    }
    blog.comments.push({ author, content });
    await blog.save();

    res.status(201);
  } catch (error) {
    res.status(500).send("Server error");
    console.log(error);
  }
}
