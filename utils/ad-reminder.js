const Advertisement = require("../models/advertisement.model")
const sendMail = require("./mailer")

function sendAdReminder() {
  return new Promise((resolve, reject) => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const afterTomorrow = new Date(tomorrow)
    afterTomorrow.setDate(tomorrow.getDate() + 1)

    Advertisement.find({
      $expr: {
        $and: [
          { $gte: ["$startDate", tomorrow] },
          { $lt: ["$startDate", afterTomorrow] },
        ],
      },
    })
      .populate("advertiser", "email")
      .select("advertiser")
      .lean()
      .exec((err, data) => {
        if (err) reject(err)
        const emails = data.map((item) => item.advertiser.email)
        sendMail(emails)
          .then(() => resolve())
          .catch((err) => reject(err))
      })
  })
}

module.exports = sendAdReminder
