module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  db: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    jwtSecret:
      process.env.JWT_SECRET ||
      "b33e90b30f5f840f0a79f4af3f71bb452272276d6e7a8e586ff4e9974c6a176b",
    maxAge: process.env.JWT_MAX_AGE || "7d",
  },
  cookies: {
    secret:
      process.env.COOKIES_SECRET ||
      "2d1ce9821e077c90c5f82fdab273717f499f344a2ab7343d146fafe0c83ece0f",
    // max age in seconds
    maxAge: process.env.COOKIES_MAX_AGE || 604800,
  },
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
}
