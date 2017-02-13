const fs = require('fs')
const path = require('path')
const palettes = require('./palettes.json')

function writeFile(name, ext, content) {
  const filename = path.join(__dirname, '../dist', name + ext)
  const header = '/* ' + name + ' */\n\n'
  fs.writeFileSync(filename, header + content)
  console.log(content)
}

function createCss(palette) {
  let css = ':root {\n'
  palette.forEach(function (hex, i) {
    css += ('--black' + i + ': #' + hex + ';\n')
  })
  css += '}'
  return css
}

function createSass(palette) {
  let sass = ''
  palette.forEach(function (hex, i) {
    sass += ('$black' + i + ': #' + hex + ';\n')
  })
  return sass
}

Object.keys(palettes).forEach(function (key, i) {
  const palette = palettes[key]
  const css = createCss(palette)
  const sass = createSass(palette)
  writeFile(key, '.scss', sass)
  writeFile(key, '.css', css)
})
