const router = require("express").Router()
const tagsRouter = require("./tags.router")

router.use("/tags", tagsRouter)

module.exports = router
