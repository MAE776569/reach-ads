const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Advertisement = new Schema({
  type: {
    type: String,
    required: true,
    enum: ["free", "paid"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  advertiser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
  },
})

module.exports = mongoose.model("Advertisement", Advertisement)
