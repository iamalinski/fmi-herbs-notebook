const mongoose = require("mongoose")

const Schema = mongoose.Schema
const HerbSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
    regionId: {
      type: Schema.Types.ObjectId,
      ref: "Region",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Herb", HerbSchema)
