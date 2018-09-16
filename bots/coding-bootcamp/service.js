const line = require('@line/bot-sdk')
const config = require('./config.json')

const client = new line.Client(config)
const middleware = line.middleware(config)

module.exports = {
  client,
  middleware
}
