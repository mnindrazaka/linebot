const { client } = require('./service')
const scrapping = require('./scrapper')

function callback(req, res) {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result))
}

async function handleEvent(event) {
  let echo = {}

  if (event.message.text == '/trends') {
    echo = makeCarousel(await getTrendingLanguage())
  } else {
    echo = { type: 'text', text: 'Saya tidak mengerti, saya simpan dulu' }
  }

  return client.replyMessage(event.replyToken, echo)
}

function makeCarousel(columns) {
  return {
    type: 'template',
    altText: 'this is a carousel template',
    template: {
      type: 'carousel',
      columns,
      imageAspectRatio: 'rectangle',
      imageSize: 'cover'
    }
  }
}

function getTrendingLanguage() {
  return scrapping().then(response =>
    response.map(item => ({
      imageBackgroundColor: '#FFFFFF',
      title: item.name,
      text: item.percentage,
      actions: [
        {
          type: 'postback',
          label: 'Add to cart',
          data: 'action=add&itemid=111'
        },
        {
          type: 'uri',
          label: 'View detail',
          uri: 'http://example.com/page/111'
        }
      ]
    }))
  )
}

module.exports = callback
