import { Router } from "express";

const homeRoute = Router();

homeRoute.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
  });
});

export { homeRoute };
