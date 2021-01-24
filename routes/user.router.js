const router = require("express").Router()
const Advertisement = require("../models/advertisement.model")
const { query, validationResult } = require("express-validator")
const errorFormatter = require("../config/errorFormatter")
const { authenticateUser } = require("../middlewares/authentication")

router.use(authenticateUser)

router.get("/", (req, res, next) => {
  const loggedIn = Boolean(req.user)
  const data = { loggedIn }
  if (loggedIn) {
    const { email, isAdmin } = req.user
    data.user = { email, isAdmin }
  }
  return res.json({ ...data })
})

router.get("/ads", [query("user").isMongoId().optional()], (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter)
  const { user } = req.query
  const id = errors.isEmpty() && user ? user : req.user.id

  Advertisement.find({ advertiser: id })
    .sort("-startDate")
    .exec((err, data) => {
      if (err) return next(err)
      return res.json({ data })
    })
})

module.exports = router
