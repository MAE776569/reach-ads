const router = require("express").Router()
const User = require("../models/user.model")

router.get("/", (req, res, next) => {
  User.find({ isAdmin: false }).exec((err, data) => {
    if (err) return next(err)
    return res.json({ data })
  })
})

module.exports = router
