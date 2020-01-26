const express = require('express')
const router = express.Router();

const mentorController = require('./controller/mentor')

router.get('/mentor/list', mentorController.mentorlist)

module.exports = router