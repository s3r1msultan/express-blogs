import { Router } from "express";
const languageRoute = Router();

languageRoute.get("/", (req, res) => {
  const language = req.query.lang;
  res.cookie("language", language || "en", { httpOnly: true, signed: true });
  res.redirect("back");
});

export { languageRoute };
