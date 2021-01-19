const router = require("express").Router()
const Advertisement = require("../models/advertisement.model")
const { query, validationResult } = require("express-validator")
const errorFormatter = require("../config/errorFormatter")

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