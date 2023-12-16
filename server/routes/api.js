const express = require("express")
const router = express.Router()

const {
  herb,
  herbs,
  createHerb,
  updateHerb,
  removeHerb,
  addComment
} = require("../controllers/herbs")
const { register, login } = require("../controllers/users")
const { migrateUsers, migrateHerbs, migrateRegions } = require("../controllers/migrations")

router.post("/herbs/create", createHerb)
router.get("/herbs", herbs)
router.patch("/herb/update/:id", updateHerb)
router.get("/herb/:id", herb)
router.delete("/herb/remove/:id", removeHerb)
router.patch("/herb/comment/:id", addComment)

router.post("/register", register)
router.post("/login", login)

router.get("/migrate/users", migrateUsers)
router.get("/migrate/herbs", migrateHerbs)
router.get("/migrate/regions", migrateRegions)

module.exports = router
