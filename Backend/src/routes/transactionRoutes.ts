import {Router} from 'express'

const express = require('express')
const authController = require('../controller/authController')
const transactionController = require('../controller/transactionController')

const router : Router = express.Router();

router.get('/', authController.protect, transactionController.manyTransactions)

router.post('/new', authController.protect, transactionController.newTransaction)

module.exports = router;