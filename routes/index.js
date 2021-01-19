const router = require("express").Router()
const authRouter = require("./auth.router")
const tagsRouter = require("./tags.router")
const categoriesRouter = require("./categories.router")
const adsRouter = require("./advertisements.router")

router.use("/auth", authRouter)
router.use("/tags", tagsRouter)
router.use("/categories", categoriesRouter)
router.use("/ads", adsRouter)

module.exports = router
