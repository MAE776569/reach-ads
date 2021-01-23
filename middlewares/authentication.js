const config = require("../config/server.config")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

function authenticateUser(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"]
  const authCookie = req.signedCookies["actk"]
  const tokenHeader = authHeader && authHeader.split(" ")[1]
  const tokenCookie =
    authCookie && cookieParser.signedCookie(authCookie, config.cookies.secret)

  if (!tokenHeader && !tokenCookie)
    return res.status(401).json({ message: "Unauthorized" })

  const token = tokenHeader ? tokenHeader : tokenCookie
  jwt.verify(token, config.jwt.jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" })
    req.user = user
    return next()
  })
}

const authenticateAdmin = [
  authenticateUser,
  (req, res, next) =>
    req.user.isAdmin
      ? next()
      : res.status(401).json({ message: "Unauthorized" }),
]

module.exports = {
  authenticateUser,
  authenticateAdmin
}
