const router = require("express").Router()
const authRouter = require("./auth.router")
const tagsRouter = require("./tags.router")
const categoriesRouter = require("./categories.router")
const adsRouter = require("./advertisements.router")
const userRouter = require("./user.router")

router.use("/auth", authRouter)
router.use("/tags", tagsRouter)
router.use("/categories", categoriesRouter)
router.use("/ads", adsRouter)
router.use("/user", userRouter)

module.exports = router
