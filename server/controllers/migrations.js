const Herb = require("../models/Herb")
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
}
