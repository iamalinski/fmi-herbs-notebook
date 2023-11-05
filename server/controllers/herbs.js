const Herb = require('../models/Herb')

async function herbs(req, res) {
    try {
      const perPage = 5
      const page = req.query.page || 1

      const data = await Herb.aggregate([ { $sort: { createdAt: -1 } } ])
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
    }
}

async function herb(req, res) {
  try {
      const data = await Herb.findById({ _id: req.params.id })

      res.json({
          data
      })
      
  } catch (error) {
      console.log(error)
  }
}

//Test request
async function insertHerbData(req, res) {
  try {
    const data = await Herb.insertMany([
      {
        title: "Авто Обучение",
        description: "Мултимедийно интерактивно учебно помагало за кандидат-шофьори. Видео обучение и актуални изпитни въпроси по всички теми от учебната програма на ИА „АА“. Изпитните въпроси са 100% идентични с тези на официалния изпит по теория."
      },
      {
        title: "Обучение за капитани и механици",
        description: "Обучението за капитани съдържа пълен набор от тестови въпроси включени в изпитите за придобиване на правоспособност за капитан или механик, както и цялостна подготовка по всяка тема. За улеснение на обучаващия се, всички теми са групирани по правоспособности. Курсистите могат по всяко едно време да следят своите резултати чрез подробна статистика."
      },
    ])

    res.json({
      data
    })
  } catch(error) {
    console.log(error)
  }
}

module.exports = {
  herb,
  herbs,
  insertHerbData
};
