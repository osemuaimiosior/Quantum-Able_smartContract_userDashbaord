const express = require('express');
const router = express.Router();
const etfRealTimeDataController = require('../../controllers/etfRealTimeDataController');

router.route('/dailyHistoric')
    .get(etfRealTimeDataController);

router.route('/weeklyHistoric')
    .get(etfRealTimeDataController);

router.route('/monthlyHistoric')
    .get(etfRealTimeDataController);

module.exports = router;