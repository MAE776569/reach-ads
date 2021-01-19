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

module.exports = router
