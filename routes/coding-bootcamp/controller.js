const { client } = require('./bot/service')
const { scrapping, selectorIndex } = require('./services/stackoverflow')

function callback(req, res) {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result))
}

async function handleEvent(event) {
  let echo = {}

  switch (event.message.text) {
    case 'trending language':
      echo = makeCarousel(makeCarouselColumns(getData(selectorIndex.language)))
      break
    case 'trending framework':
      echo = makeCarousel(makeCarouselColumns(getData(selectorIndex.framework)))
      break
    case 'trending database':
      echo = makeCarousel(makeCarouselColumns(getData(selectorIndex.database)))
      break
    default:
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

function makeCarouselColumns(data) {
  return data.map(item => ({
    imageBackgroundColor: '#FFFFFF',
    title: item.label,
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
}

function getData(selectorIndex) {
  return scrapping(selectorIndex).then(response => response)
}

module.exports = callback
