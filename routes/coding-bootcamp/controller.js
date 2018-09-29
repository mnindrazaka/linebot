const { client } = require('./bot/service')
const { scrapping, selectorIndex } = require('./services/stackoverflow')

function callback(req, res) {
  Promise.all(req.body.events.map(handleEvent)).then(result => res.json(result))
}

async function handleEvent(event) {
  let echo = {}
  console.log(event)

  if (event.type == 'message') {
    echo = await handleMessage(event.message.text)
  } else if (event.type == 'postback') {
    echo = await handlePostback(event.postback.data)
  }

  return client.replyMessage(event.replyToken, echo)
}

async function handleMessage(text) {
  console.log(text)

  let reply = ''
  switch (text) {
    case 'trending language':
      reply = makeCarousel(
        makeCarouselColumns(await getData(selectorIndex.language))
      )
      break
    case 'trending framework':
      reply = makeCarousel(
        makeCarouselColumns(await getData(selectorIndex.framework))
      )
      break
    case 'trending database':
      reply = makeCarousel(
        makeCarouselColumns(await getData(selectorIndex.database))
      )
      break
    default:
      reply = { type: 'text', text: 'Saya tidak mengerti' }
  }
  return reply
}

function handlePostback(data) {
  console.log(data)
  return { type: 'text', text: data }
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
        label: 'Cari Tutorial',
        data: item.label
      }
    ]
  }))
}

async function getData(selectorIndex) {
  return await scrapping(selectorIndex)
}

module.exports = callback
