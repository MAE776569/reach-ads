const router = require("express").Router()
const authRouter = require("./auth.router")
const tagsRouter = require("./tags.router")

router.use("/auth", authRouter)
router.use("/tags", tagsRouter)

module.exports = router
