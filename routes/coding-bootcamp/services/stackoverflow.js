const axios = require('axios')
const cheerio = require('cheerio')
let $

async function scrapping(selectorIndex) {
  loadCheerio(await getHTML())
  return getData(getSelector(selectorIndex))
}

function loadCheerio(html) {
  $ = cheerio.load(html)
}

async function getHTML() {
  const response = await axios.get(
    'https://insights.stackoverflow.com/survey/2018/'
  )
  return response.data
}

function getData(selector) {
  const labels = scrape(selector + ' .bar-label')
  const percentages = scrape(selector + ' span')
  return formatData({ labels, percentages })
}

function getSelector(index) {
  const selector = {
    language: '#technology-most-loved-dreaded-and-wanted-wanted',
    framework: '#technology-most-loved-dreaded-and-wanted-wanted2',
    database: '#technology-most-loved-dreaded-and-wanted-wanted3'
  }
  const key = Object.keys(selector)[index]
  return selector[key]
}

function scrape(selector) {
  const limit = 10
  return $(selector)
    .toArray()
    .slice(0, limit)
    .map(element => $(element).html())
}

function formatData(data) {
  return data.labels.map((label, index) => ({
    label,
    percentage: data.percentages[index]
  }))
}

module.exports = {
  scrapping,
  selectorIndex: {
    language: 0,
    framework: 1,
    database: 2
  }
}
