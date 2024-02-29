import { Router } from "express";

const pageNotFoundRoute = Router();

pageNotFoundRoute.all("*", (req, res) => {
  res.status(404).render("pageNotFound", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
  });
});

export { pageNotFoundRoute };
