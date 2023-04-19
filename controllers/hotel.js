const Hotel = require('../models/Hotel');

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json('Hotel has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}

const getHotel = async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id)

    if (!hotel) {
        res.status(500).json('Hotel dose not exist!')
    } else {
        res.status(200).json(hotel)
    }

}

const getAllHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find({})
        res.status(200).json(hotels)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getAllHotels
}