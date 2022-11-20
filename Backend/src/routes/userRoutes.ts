import {Router} from 'express'

const express = require('express')
const authController = require('../controller/authController')
const userController = require('../controller/userController')

const router : Router = express.Router();

router.post('/newAccount', authController.newAccount)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

router.get('/me', authController.protect, userController.me)

router.get('/:username', userController.getUser)



module.exports = router;