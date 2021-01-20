const nodemailer = require("nodemailer")
const config = require("../config/server.config")

async function sendMail(userEmails) {
  const testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email.user || testAccount.user, // generated ethereal user
      pass: config.email.password || testAccount.pass, // generated ethereal password
    },
  })

  const mailOpts = {
    from: config.email.user || testAccount.user,
    to: userEmails.join(", "),
    subject: "Your Ad starts tomorrow",
    text: "This a reminder that your ad starts tomorrow",
    html: "<p>This a reminder that your ad starts tomorrow</p>",
  }

  transporter.sendMail(mailOpts, function (error, info) {
    if (error) return Promise.reject(error)
    else return Promise.resolve(info)
  })
}

module.exports = sendMail
