const express = require('express');
const router = express.Router();

const{createHotel, updateHotel, deleteHotel, getHotel, getAllHotels} = require('../controllers/hotel')

router.post('/', createHotel)
router.patch('/:id', updateHotel)
router.delete('/:id', deleteHotel)
router.get('/:id', getHotel)
router.get('/', getAllHotels)

module.exports = router;