const router = require("express").Router()
const Tag = require("../models/tag.model")
const { body, param, query, validationResult } = require("express-validator")
const errorFormatter = require("../config/errorFormatter")

router.get("/", [query("name").isAlpha().optional()], (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter).mapped()
  const { name } = req.query
  const filter = errors.name || !name ? {} : { name: new RegExp(name, "ig") }

  Tag.find(filter).exec((err, data) => {
    if (err) return next(err)
    return res.json({ data })
  })
})

module.exports = router
