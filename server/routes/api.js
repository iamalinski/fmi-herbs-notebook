const express = require("express")
const router = express.Router()

const {
  herb,
  herbs,
  createHerb,
  updateHerb,
  removeHerb,
} = require("../controllers/herbs")
const { register, login } = require("../controllers/users")
const { migrateUsers, migrateHerbs } = require("../controllers/migrations")

router.post("/herbs/create", createHerb)
router.get("/herbs", herbs)
router.patch("/herb/update/:id", updateHerb)
router.get("/herb/:id", herb)
router.delete("/herb/remove/:id", removeHerb)

router.post("/register", register)
router.post("/login", login)

router.get("/migrate/users", migrateUsers)
router.get("/migrate/herbs", migrateHerbs)

module.exports = router
