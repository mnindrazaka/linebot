const router = require('express').Router()
const callback = require('./controller')
const { middleware } = require('./bot/service')

router.post('/', middleware, callback)
module.exports = router
