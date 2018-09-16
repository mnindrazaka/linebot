const router = require('express').Router()
const callback = require('./controller')
const { middleware } = require('./service')

router.post('/', middleware, callback)
module.exports = router
