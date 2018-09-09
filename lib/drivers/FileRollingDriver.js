let fs = require('fs')
let FileDriverInterface = require('../interfaces/FileDriverInterface')

class FileRollingDriver extends FileDriverInterface {
  constructor (options = {}) {
    super(options)

    this.keepLast = options.keepLast || 10
    this._BuildLogDirectory()
  }

  _CreateFile () {
    let path = this._GetPath()
    if (!(fs.existsSync(path))) {
      try {
        fs.writeFileSync(path, '')
      } catch (e){
        throw e
      }
      if (this.keepLast > 0) {
        this._CleanFiles()
      }
    }
    return path
  }

  _CleanFiles () {
    try {
      let files = fs.readdirSync(this._GetLogDirectory())
      files.forEach((file) => {
        let match = file.match(this.fileNamePattern.replace(/<DATE>/ig, '([0-9.]+)'))
        if (match) {
          let created = new Date(match[1])
          let now = new Date()
          let timeDiff = Math.abs(now.getTime() - created.getTime())
          let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1
          if (diffDays >= this.keepLast) {
            try{
              fs.unlinkSync(this._GetLogDirectory() + file)
            } catch (e){
              throw e
            }
          }
        }
      })
    } catch (e){
      throw e
    }
  }

  Log (message, type) {
    let file = this._CreateFile()
    let stream = fs.createWriteStream(file, { 'flags': 'a' })
    stream.once('open', () => {
      stream.write(this.Format(message, type) + '\r\n')
      stream.end()
    })
  }
}

module.exports = FileRollingDriver
