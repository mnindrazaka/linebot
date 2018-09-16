const express = require('express')
const app = express()
const scrapping = require('./scrapper')
const line = require('@line/bot-sdk')
const config = {
  channelAccessToken:
    'D/iRCV3IOC/hmvueC1T+wkPMDrTaa2k+mh7KzA/Ke4RfwXOK3RnP079vwI8SwGgpWEF/iUWsWPqylJKCdH2qOM7E5zw9DaXJemsLAtRCLwajJXSHuHQZxg1GqZNI86vXr0nra0J8apmiy+VXjtR2GAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '91c68e7f44bb0cc62801432f3cbcbb69'
}
const client = new line.Client(config)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server Started...'))

app.get('/', (req, res) => {
  scrapping().then(response => res.send(response))
})

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
    .catch(e => {
      console.log(e)
    })
})

function handleEvent(event) {
  if (event.message.text == 'hai') {
    const echo = { type: 'text', text: 'Halo juga :)·' }
    return client.replyMessage(event.replyToken, echo)
  }

  const echo = { type: 'text', text: 'Saya tidak mengerti, saya simpan dulu' }
  return client.replyMessage(event.replyToken, echo)
}
