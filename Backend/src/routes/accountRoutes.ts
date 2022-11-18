import {Router} from 'express'

const express = require('express')
const authController = require('../controller/authController')
const accountController = require('../controller/accountController')

const router : Router = express.Router();

router.get('/', authController.protect, accountController.getData)

module.exports = router;