const config = require("../config/server.config")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

function authenticateUser(req, res, next) {
  const authCookie = req.signedCookies["actk"]
  const tokenCookie =
    authCookie && cookieParser.signedCookie(authCookie, config.cookies.secret)

  if (!tokenCookie) return res.status(401).json({ message: "Unauthorized" })
  jwt.verify(tokenCookie, config.jwt.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" })
    req.user = user
    return next()
  })
}

module.exports = {
  authenticateUser,
}
