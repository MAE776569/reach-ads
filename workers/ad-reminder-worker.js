const { CronJob } = require("cron")
const sendAdReminder = require("../utils/ad-reminder")

const adReminderJob = new CronJob("0 0 20 * * *", async () => {
  console.log("Starting ad reminder worker")
  try {
    await sendAdReminder()
  } catch (error) {
    console.log("Error sending ad reminder - ad reminder job")
  }
})

module.exports = adReminderJob
