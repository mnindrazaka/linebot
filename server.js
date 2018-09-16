const express = require('express')
const app = express()
const scrapping = require('./scrapper')

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server Started...'))

app.get('/', (req, res) => {
  scrapping().then(response => res.send(response))
})
