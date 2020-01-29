const express = require('express')
const router = express.Router();

const mentorController = require('./controller/mentor')

router.post('/mentor/list', mentorController.mentorlist)
router.post('/mentor/video/list', mentorController.mentorVideoList)
router.post('/mentor/profile', mentorController.mentorProfile)



module.exports = router