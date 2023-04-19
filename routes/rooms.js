const express = require('express');
const router = express.Router();

const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } = require('../controllers/room');
const {verifyAdmin} = require('../utils/verifyToken')

router.post('/:hotelid', verifyAdmin, createRoom)
router.patch('/:id', verifyAdmin, updateRoom)
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)
router.get('/:id', getRoom)
router.get('/', getAllRooms)

module.exports = router;