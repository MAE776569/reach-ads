const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileDir = "./media"
    if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true })
    cb(null, fileDir)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname}-${uuidv4()}${path.extname(file.originalname)}`
    )
  },
})

function fileFilter(req, file, cb) {
  if (/^image\//.test(file.mimetype)) return cb(null, true)
  cb(null, false)
}

const saveImage = multer({
  storage: imageStorage,
  fileFilter,
})

module.exports = saveImage.single("file")
