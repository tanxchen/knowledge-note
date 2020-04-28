const fs = require('fs')

function wf (fileName, str) {
  fs.writeFileSync(fileName, str, 'utf8', (err) => {
    if (err) throw err
  })
}

class RemoveCommentsPlugin {
  constructor (options = {}) {
    this.options = options
  }

  apply(compiler) {
    wf('compiler.json', JSON.stringify(compiler))

    compiler.hooks.emit.tap(
      'RemoveCommentsPlugin',
      // compilation 可以理解为此次打包的上下文
      compilation  => {
        // wf('compilation.json', JSON.stringify(compilation))
        for (const name in compilation.assets) {
          if (name.endsWith('.js')) {
            const contents = compilation.assets[name].source()
            const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
            compilation.assets[name] = {
              source: () => noComments,
              size: () => noComments.length
            }
          }
        }
      }
    )
  }
}

module.exports = RemoveCommentsPlugin