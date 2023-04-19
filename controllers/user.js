const User = require('../models/User');


const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}

const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(500).json('User dose not exist!')
    } else {
        res.status(200).json(user)
    }

}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers
}