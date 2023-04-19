const express = require('express');
const router = express.Router();

const { createHotel, updateHotel, deleteHotel, getHotel, getAllHotels } = require('../controllers/hotel');
const { verifyAdmin } = require('../utils/verifyToken');

router.post('/', verifyAdmin, createHotel)
router.patch('/:id', verifyAdmin, updateHotel)
router.delete('/:id', verifyAdmin, deleteHotel)
router.get('/:id', getHotel)
router.get('/', getAllHotels)

module.exports = router;