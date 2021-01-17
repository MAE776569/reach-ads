const config = require("./server.config")
const jwt = require("jsonwebtoken")

function generateAccessToken(user) {
  const token = jwt.sign({ ...user }, config.jwt.jwtSecret, {
    expiresIn: config.jwt.maxAge,
  })
  return token
}

module.exports = {
  generateAccessToken,
}
