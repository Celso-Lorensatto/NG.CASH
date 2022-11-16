import {Router} from 'express'

const express = require('express')
const authController = require('../controller/authController')

const router : Router = express.Router();

router.post('/newAccount', authController.newAccount)

router.post('/logIn', (req,res) => {
    return res.json({message:'ok'})
})

router.get('/logOut', (req,res) => {
    return res.json({message:'ok'})
})

router.get('/accountData', (req,res) => {
    return res.json({message:'ok'})
})


module.exports = router;