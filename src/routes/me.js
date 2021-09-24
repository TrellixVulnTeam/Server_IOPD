const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/meController');

router.get('/stored/phone', meController.storedPhone);
router.get('/trash/phone', meController.trashPhone);
//router.post('/store', meController.store);
//router.get('/:slug', meController.show);
//router.get('/', phoneController.index);

module.exports = router;
