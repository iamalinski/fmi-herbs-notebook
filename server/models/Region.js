const mongoose = require("mongoose")

const Schema = mongoose.Schema
const RegionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Region", RegionSchema)