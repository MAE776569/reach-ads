const router = require("express").Router()
const saveImage = require("../middlewares/imageUploader")
const { authenticateUser } = require("../middlewares/authentication")

router.use(authenticateUser)

router.post("/", saveImage, (req, res) => {
  const { file } = req
  if (!file)
    return res.status(422).json({ errors: { file: "No image is selected" } })
  const fileURL =
    req.protocol +
    "://" +
    req.get("host") +
    req.url +
    file.path.replace(/\\/g, "/")
  return res.json({ success: true, path: fileURL })
})

module.exports = router
