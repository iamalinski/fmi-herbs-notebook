require("dotenv").config()

const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const MongoStore = require("connect-mongo")

const connectDB = require("./server/config/database")

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(
  session({
    secret: "fmi-2109011765",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

app.use("/public/", express.static("public"))

app.use("/", require("./server/routes/api"))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
