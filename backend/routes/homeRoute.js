import { Router } from "express";
import axios from "axios";

const homeRoute = Router();

homeRoute.get("/", async (req, res) => {
  const catResponse = await axios.get('https://api.thecatapi.com/v1/images/search');
  const dogResponse = await axios.get('https://random.dog/woof.json');
  
  const catImageUrl = catResponse.data[0].url;
  const dogImageUrl = dogResponse.data.url;

  res.render("index", {
    title: "Home",
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
    catImageUrl,
    dogImageUrl,
  });
});

export { homeRoute };
