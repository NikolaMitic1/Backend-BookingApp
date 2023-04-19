const express = require('express');
const router = express.Router();

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken')
const { updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/user')

/* router.get('/checkauthentication', verifyToken, (req, res, next)=>{
    res.send('Loginovan Bravo!')
})

router.get('/checkuser/:id', verifyUser, (req, res, next)=>{
    res.send('mozes i da obrises!')
})

router.get('/checkadmin/:id', verifyAdmin, (req, res, next)=>{
    res.send('Admin si!')
}) */

router.patch('/:id', verifyUser, updateUser)
router.delete('/:id', verifyUser, deleteUser)
router.get('/:id', verifyUser, getUser)
router.get('/', verifyAdmin,getAllUsers)

module.exports = router;