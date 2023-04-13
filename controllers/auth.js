const User = require('../models/User')
const bycrypt = require('bcryptjs')

const register = async (req, res, next) => {
    try {
        const salt = bycrypt.genSaltSync(10)
        const hash = bycrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            city: req.body.city,
            country: req.body.country
        })

        await newUser.save()
        res.status(201).json('User has been created')

    } catch (error) {
        res.status(500).json(error)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })

        if (!user) {
            return res.status(500).json('User dose not exits!')
        }

        const isPasswordCorrect = await bycrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect) {
            return res.status(500).json('Password is incorrect!')
        }


        const {password, isAdmin, ...other} = user._doc
        res.status(200).json({...other})
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    register,
    login,
}