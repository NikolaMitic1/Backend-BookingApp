const Room = require('../models/Room')
const Hotel = require('../models/Hotel')
const { createError } = require('../utils/error')

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateRoom)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (error) {
            next(error)
        }
        res.status(200).json('Room has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}

const getRoom = async (req, res, next) => {
    const room = await Room.findById(req.params.id)

    if (!room) {
        res.status(500).json('Room dose not exist!')
    } else {
        res.status(200).json(room)
    }

}

const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({})
        res.status(200).json(rooms)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createRoom,
    deleteRoom,
    updateRoom,
    getAllRooms,
    getRoom
}