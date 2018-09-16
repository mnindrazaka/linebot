const client = require('./client')

function callback(req, res) {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result))
}

function handleEvent(event) {
  if (event.message.text == '/trends') {
    const echo = { type: 'text', text: 'Javascript' }
    return client.replyMessage(event.replyToken, echo)
  }

  const echo = { type: 'text', text: 'Saya tidak mengerti, saya simpan dulu' }
  return client.replyMessage(event.replyToken, echo)
}

module.exports = callback
