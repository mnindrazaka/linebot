const router = require('express').Router()
const line = require('@line/bot-sdk')
const config = require('./config.json')
const callback = require('./controller')

router.post('/', line.middleware(config), callback)

module.exports = router
