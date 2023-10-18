const Herb = require('../models/Herb')

module.exports = async function (req, res) {
    try {
        const data = await Herb.findById({ _id: req.params.id })

        res.json({
            data
        })
        
    } catch (error) {
        console.log(error)
    }
}