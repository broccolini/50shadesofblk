const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const chroma = require('chroma-js')
const palettes = require('./palettes.json')

const tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')
const compiled = _.template(tpl)

function writeHtml(content) {
  const filename = path.join(__dirname, '..', 'index.html')
  fs.writeFileSync(filename, content)
}

function createHtml(data) {
  const html = compiled(data)
  return html
}

function getTextColor(background, key) {
  const l = chroma(background).luminance()
  const palette = palettes[key]
  const black = '#' + palette[0]
  const white = '#' + palette[9]
  if (l > 0.5) {
    return black
  } else {
    return white
  }
}

const data = {
  palettes: palettes,
  getTextColor: getTextColor
}

const html = createHtml(data)
writeHtml(html)
