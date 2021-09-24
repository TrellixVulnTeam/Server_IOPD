const express = require('express');
const router = express.Router();

const phoneController = require('../app/controllers/PhoneController');

router.get('/create', phoneController.create);
router.post('/store', phoneController.store);
router.get('/:id/edit', phoneController.edit);
router.put('/:id', phoneController.update);
router.patch('/:id/restore', phoneController.restore);
router.delete('/:id', phoneController.delete);
router.delete('/:id/force', phoneController.forceDelete);
router.get('/:slug', phoneController.show);
//router.get('/', phoneController.index);

module.exports = router;
