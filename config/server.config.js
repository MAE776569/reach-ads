module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  db: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
    maxAge: process.env.JWT_MAX_AGE || "2d",
  },
  cookies: {
    secret: process.env.COOKIES_SECRET,
    // max age in seconds
    maxAge: process.env.COOKIES_MAX_AGE,
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
}
