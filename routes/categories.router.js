const router = require("express").Router()
const Category = require("../models/category.model")
const { body, param, query, validationResult } = require("express-validator")
const errorFormatter = require("../config/errorFormatter")

router.get("/", (req, res, next) => {
  Category.find({})
    .sort("title -createdAt")
    .exec((err, data) => {
      if (err) return next(err)
      return res.json({ data })
    })
})

module.exports = router
