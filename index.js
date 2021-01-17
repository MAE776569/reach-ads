require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const config = require("./config/server.config")
const routes = require("./routes")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("./models/user.model")
const cookieParser = require("cookie-parser")

// Connect to the database
mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
const db = mongoose.connection
db.on("error", () => {
  console.error.bind(console, "! Error connecting to the database")
  process.exit(1)
})
db.once("open", () => {
  console.log("> Connected correctly to the database")
})

app.use("/media", express.static(path.join(__dirname, "media")))
app.use(bodyParser.json())
app.use(
  cookieParser(config.cookies.secret, {
    httpOnly: true,
    maxAge: config.cookies.maxAge,
  })
)
app.use(passport.initialize())
passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(routes)

// Error handler
app.use((err, req, res, next) => {
  if (config.env === "production") {
    return res.status(500).json({
      message: "Unexpected error",
    })
  } else return res.status(500).send(err)
})

app.listen(config.port, () => {
  console.log(`> Ready on port: ${config.port}`)
})
