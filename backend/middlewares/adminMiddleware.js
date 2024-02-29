export function isAdmin(req, res, next) {
  if (req.signedCookies.isAdmin === "true") {
    next();
  } else {
    res.status(403).redirect("/");
  }
}
