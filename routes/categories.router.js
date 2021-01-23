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

router.get("/:id", [param("id").isMongoId()], (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter)
  if (!errors.isEmpty())
    return res.status(404).json({ message: "Category not found" })

  Category.findById(req.params.id, (err, data) => {
    if (err) return next(err)
    if (!data) res.status(404).json({ message: "Category not found" })
    return res.json({ data })
  })
})

router.post(
  "/",
  [
    body("title").isString().notEmpty(),
    body("description").isString().optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.mapped() })

    const { title, ...optionalData } = req.body
    Category.create({ title, ...optionalData }, (err, data) => {
      if (err) return next(err)
      return res.status(201).json({ data })
    })
  }
)

router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("title").isString().notEmpty(),
    body("description").isString().optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter)
    const mappedErrors = errors.mapped()
    if (mappedErrors.id)
      return res.status(422).json({ message: "Invalid category id" })
    if (!errors.isEmpty()) return res.status(422).json({ errors: mappedErrors })

    const { title, ...optionalData } = req.body
    Category.findByIdAndUpdate(
      req.params.id,
      { title, ...optionalData },
      { new: true },
      (err, data) => {
        if (err) return next(err)
        if (!data)
          return res.status(404).json({ message: "Category not found" })
        return res.json({ data })
      }
    )
  }
)

router.delete("/:id", [param("id").isMongoId()], (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter)
  if (!errors.isEmpty())
    return res.status(404).json({ message: "Invalid category id" })

  Category.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) return next(err)
    if (!data) return res.status(404).json({ message: "Category not found" })
    return res.json({ data })
  })
})

module.exports = router
