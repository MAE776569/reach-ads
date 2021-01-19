const router = require("express").Router()
const Advertisement = require("../models/advertisement.model")
const { body, param, query, validationResult } = require("express-validator")
const errorFormatter = require("../config/errorFormatter")

router.get(
  "/",
  [
    query("tag").isMongoId(),
    query("category").isMongoId().optional(),
    query("advertiser").isMongoId().optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter).mapped()
    const filter = {}
    const { tag, category, advertiser } = req.query
    if (!errors.tag && tag) filter.tags = tag
    if (!errors.category && category) filter.category = category
    if (!errors.advertiser && advertiser) filter.advertiser = advertiser

    Advertisement.find(filter)
      .sort("-startDate")
      .exec((err, data) => {
        if (err) return next(err)
        return res.json({ data })
      })
  }
)

router.get("/:id", [param("id").isMongoId()], (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter)
  if (!errors.isEmpty())
    return res.status(404).json({ message: "Invalid advertisement id" })

  Advertisement.findById(req.params.id)
    .populate("category tags advertiser")
    .exec((err, data) => {
      if (err) return next(err)
      if (!data)
        return res.status(404).json({ message: "Advertisement not found" })
      return res.json({ data })
    })
})

router.post(
  "/",
  [
    body("type").isIn(["free", "paid"]),
    body("title").isString().notEmpty(),
    body("category").isMongoId(),
    body("advertiser").isMongoId(),
    body("tags").isArray(),
    body("tags.*").isMongoId(),
    body("endDate").isDate(),
    body("startDate").isDate().optional(),
    body("description").isString().notEmpty().optional(),
    body("image").isURL().optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.mapped() })

    const {
      type,
      title,
      category,
      advertiser,
      tags,
      endDate,
      ...optionalData
    } = req.body
    Advertisement.create(
      {
        type,
        title,
        category,
        advertiser,
        tags,
        endDate,
        ...optionalData,
      },
      (err, data) => {
        if (err) return next(err)
        return res.status(201).json({ data })
      }
    )
  }
)

router.put(
  "/:id",
  [
    param("id").isMongoId(),
    body("type").isIn(["free", "paid"]),
    body("title").isString().notEmpty(),
    body("category").isMongoId(),
    body("advertiser").isMongoId(),
    body("tags").isArray(),
    body("tags.*").isMongoId(),
    body("endDate").isDate(),
    body("startDate").isDate().optional(),
    body("description").isString().notEmpty().optional(),
    body("image").isString().notEmpty().optional(),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter)
    const mappedErrors = errors.mapped()
    if (mappedErrors.id)
      return res.status(404).json({ message: "Invalid advertisement id" })
    if (!errors.isEmpty()) return res.status(422).json({ errors: mappedErrors })

    const {
      type,
      title,
      category,
      advertiser,
      tags,
      endDate,
      ...optionalData
    } = req.body
    Advertisement.findByIdAndUpdate(
      req.params.id,
      {
        type,
        title,
        category,
        advertiser,
        tags,
        endDate,
        ...optionalData,
      },
      { new: true },
      (err, data) => {
        if (err) return next(err)
        if (!data)
          return res.status(404).json({ message: "Advertisement not found" })
        return res.json({ data })
      }
    )
  }
)

module.exports = router
