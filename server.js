const express = require('express')
const app = express()

const coding_bootcamp_routes = require('./bots/coding-bootcamp/router')
app.use('/coding_bootcamp', coding_bootcamp_routes)
app.get('/', (req, res) => res.send('line chatbot'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server Started...'))
