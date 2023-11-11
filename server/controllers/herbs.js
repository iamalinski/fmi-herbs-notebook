const Herb = require("../models/Herb")

async function herbs(req, res) {
  try {
    const perPage = 5
    const page = req.query.page || 1

    const data = await Herb.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()

    const count = await Herb.count()
    const nextPage = parseInt(page) + 1
    const hasNextPage = nextPage <= Math.ceil(count / perPage)

    res.json({
      data,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: hasNextPage ? nextPage : null,
    })
  } catch (error) {
    console.log(error)
    req.status(500).json({ message: "Server error" })
  }
}

async function herb(req, res) {
  try {
    const data = await Herb.findById({ _id: req.params.id })

    res.json({
      data,
    })
  } catch (error) {
    console.log(error)
    req.status(500).json({ message: "Server error" })
  }
}

async function removeHerb(req, res) {
  const { id } = req.params

  try {
    const data = await Herb.findByIdAndRemove({ _id: id })

    if (data) {
      res.json({
        data: {
          message: `${data.title} is removed!`,
        },
      })
    } else {
      res.status(404).json({
        data: {
          message: `No herb found!`,
        },
      })
    }
  } catch (error) {
    console.log(error)
    req.status(500).json({ message: "Server error" })
  }
}

async function createHerb(req, res) {
  try {
    const { title, description } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required." })
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required." })
    }

    const data = await Herb.create({
      title,
      description,
    })

    res.json({
      data,
    })
  } catch (error) {
    console.log(error)
    req.status(500).json({ message: "Server error" })
  }
}

async function updateHerb(req, res) {
  try {
    const { title, description } = req.body
    const { id } = req.params

    if (!title) {
      return res.status(400).json({ message: "Title is required." })
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required." })
    }

    const data = await Herb.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
      },
      { new: true }
    )

    res.json({
      data,
    })
  } catch (error) {
    console.log(error)
    req.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  herb,
  herbs,
  createHerb,
  removeHerb,
  updateHerb,
}
