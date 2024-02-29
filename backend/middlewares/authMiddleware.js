export function checkAuth(req, res, next) {
  if (req.signedCookies.isLoggedIn === "true") {
    next();
  } else {
    res.redirect("/auth/sign_in");
  }
}

export function isLoggedIn(req, res, next) {
  if (req.signedCookies.isLoggedIn === "true") {
    res.redirect("/blogs");
  } else {
    next();
  }
}
