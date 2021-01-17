require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const config = require("./config/server.config")
const routes = require("./routes")

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
app.use(routes)

// Error handler
app.use((err, req, res, next) => {
  if (config.env === "production") {
    return res.status(500).json({
      message: "Unexpected error",
    })
  } else return res.send(err)
})

app.listen(config.port, () => {
  console.log(`> Ready on port: ${config.port}`)
})
