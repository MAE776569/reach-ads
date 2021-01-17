module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    maxAge: process.env.JWT_MAX_AGE || "2d",
  },
}