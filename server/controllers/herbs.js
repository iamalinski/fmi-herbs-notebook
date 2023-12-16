const Herb = require("../models/Herb")

async function herbs(req, res) {
  try {
    const perPage = 5
    const page = req.query.page || 1

    const data = await Herb.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "regions",
          localField: "regionId",
          foreignField: "_id",
          as: "region",
        },
      },
    ])
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
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ message: "Herb id is not provided." })
  }

  try {
    const data = await Herb.findById({ _id: id })

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

  if (!id) {
    return res.status(400).json({ message: "Herb id is not provided." })
  }

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
    const { title, description, regionId } = req.body

    if (!title) {
      return res.status(400).json({ message: "Title is required." })
    }

    if (!description) {
      return res.status(400).json({ message: "Description is required." })
    }

    if (!regionId) {
      return res.status(400).json({ message: "Region is required." })
    }

    const data = await Herb.create({
      title,
      description,
      regionId,
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

    if (!id) {
      return res.status(400).json({ message: "Herb id is not provided." })
    }

    if (!regionId) {
      return res.status(400).json({ message: "Region is required." })
    }

    const data = await Herb.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        regionId
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

async function addComment(req, res) {
  try {
    const { comment, userId } = req.body
    const { id } = req.params

    if (!comment) {
      return res.status(400).json({ message: "Comment field is empty." })
    }

    if (!userId) {
      return res.status(400).json({ message: "Comment must contain user id." })
    }

    if (!id) {
      return res
        .status(400)
        .json({ message: "Comment must be addressed to a certain post." })
    }

    const commentData = {
      _id: new Date().getTime(),
      comment,
      userId,
      createdAt: new Date(),
    }

    await Herb.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          comments: commentData,
        },
      },
      { new: true }
    )

    res.json({
      data: commentData,
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
  addComment,
}
