const express = require('express');
const router = express.Router();
const EventLogsFilterController = require('../../controllers/smartContractController/EventLogsFilterController');

router.route('/transferEvent')
    .get(EventLogsFilterController.transferEvent);

router.route('/thirdPartyTransferEvent')
    .get(EventLogsFilterController.thirdPartyTransferEvent);

router.route('/burnTokenEvent')
    .get(EventLogsFilterController.burnTokenEvent);

module.exports = router;