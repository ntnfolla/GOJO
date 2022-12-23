const express = require('express')
const router = express.Router()
const housesController = require('../controllers/housesController')

router.route('/')
    .get(housesController.getAllHouses)
    .post(housesController.createNewHouse)
    .patch(housesController.updateHouse)
    .delete(housesController.deleteHouse)

module.exports = router