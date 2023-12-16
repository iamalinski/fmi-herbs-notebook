const Herb = require("../models/Herb")
const Region = require("../models/Region")
const User = require("../models/User")

async function migrateHerbs(req, res) {
  const checkHerbsCollectionCount = await Herb.count()

  if (checkHerbsCollectionCount) {
    console.log("Herbs collection already exists and containts data!")
    res.json({ message: "Herbs collection already exists and containts data!" })

    return
  }

  Herb.createCollection()
    .then(() => {
      console.log("Herbs collection is created!")
      res.json({ message: "Herbs collection is created!" })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: "Server error" })
    })
}

async function migrateRegions(req, res) {
  const checkReguinsCollectionCount = await Region.count()

  if (checkReguinsCollectionCount) {
    console.log("Regions collection already exists and containts data!")
    res.json({
      message: "Regions collection already exists and containts data!",
    })

    return
  }

  Region.createCollection()
    .then(() => {
      console.log("Regions collection is created!")

      Region.insertMany([
        {
          name: "Северозападен",
        },
        {
          name: "Югозападен",
        },
        {
          name: "Южен централен",
        },
        {
          name: "Южен източен",
        },
        {
          name: "Североизточен",
        },
        {
          name: "Северен централен",
        },
      ]).then(() => {
        console.log("Regions collection is seeded!")

        res.json({ message: "Regions collection is created, and seeded!" })
      })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: "Server error" })
    })
}

async function migrateUsers(req, res) {
  const checkUsersCollectionCount = await User.count()

  if (checkUsersCollectionCount) {
    console.log("Users collection already exists and containts data!")
    res.json({ message: "Users collection already exists and containts data!" })

    return
  }

  User.createCollection()
    .then(() => {
      console.log("Users collection is created!")
      res.json({ message: "Users collection is created!" })
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ message: "Server error" })
    })
}

module.exports = {
  migrateHerbs,
  migrateUsers,
  migrateRegions,
}
