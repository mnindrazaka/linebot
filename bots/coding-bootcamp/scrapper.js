const axios = require('axios')
const cheerio = require('cheerio')

function getHTML() {
  return new Promise((resolve, reject) => {
    axios
      .get('https://insights.stackoverflow.com/survey/2018/')
      .then(response => {
        resolve(handleHTML(response.data))
      })
  })
}

function handleHTML(html) {
  const $ = cheerio.load(html)
  const languages = []
  const percentages = []

  $('#technology-most-popular-technologies-professional-developers .bar-label')
    .toArray()
    .slice(0, 10)
    .forEach(element => languages.push($(element).html()))

  $('#technology-most-popular-technologies-professional-developers span')
    .toArray()
    .slice(0, 10)
    .forEach(element => percentages.push($(element).html()))

  return handleData({ languages, percentages })
}

function handleData(data) {
  return data.languages.map((language, index) => ({
    name: language,
    percentage: data.percentages[index]
  }))
}

module.exports = getHTML
