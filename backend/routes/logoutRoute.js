import { Router } from "express";

const logoutRoute = Router();

logoutRoute.get("/", (req, res) => {
  res.clearCookie("isLoggedIn");
  res.clearCookie("isVerified");
  res.clearCookie("isAdmin");
  res.clearCookie("username");
  res.redirect("/");
});

export { logoutRoute };
