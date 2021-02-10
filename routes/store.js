const router = require('express').Router()

const Address = require('../models/Address')
const Store = require('../models/Store')

const StoreController = require('../controllers/StoreController')

router.post('/', StoreController.createNewStore)

router.get('/', StoreController.getStores)

module.exports = router