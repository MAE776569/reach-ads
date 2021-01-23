const router = require("express").Router()
const authRouter = require("./auth.router")
const tagsRouter = require("./tags.router")
const categoriesRouter = require("./categories.router")
const adsRouter = require("./advertisements.router")
const userRouter = require("./user.router")
const uploadsRouter = require("./uploads.router")
const advertisersRouter = require("./advertisers.router")

router.use("/auth", authRouter)
router.use("/tags", tagsRouter)
router.use("/categories", categoriesRouter)
router.use("/ads", adsRouter)
router.use("/user", userRouter)
router.use("/upload", uploadsRouter)
router.use("/advertisers", advertisersRouter)

module.exports = router
