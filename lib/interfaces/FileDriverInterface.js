let fs = require('fs')
let LoggerDriverInterface = require('./LoggerDriverInterface')

class FileDriverInterface extends LoggerDriverInterface {
  constructor (options = {}) {
    super(options)

    if (new.target === FileDriverInterface) {
      throw new Error('Cannot construct Abstract instances directly')
    }

    this.dateFormat = 'YYYY.MM.DD'
    this.logDirectory = options.logDirectory || './'
    this.fileNamePattern = options.fileNamePattern || 'log-<DATE>.log'
  }

  _BuildLogDirectory () {
    if (!fs.existsSync(this._GetLogDirectory())) {
      let dirName = ''
      let filePathSplit = this._GetLogDirectory().split('/')
      for (let index = 0; index < filePathSplit.length; index++) {
        dirName += filePathSplit[index] + '/'
        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName)
        }
      }
    }
  }

  _GetFileName () {
    let date = new Date()
    return this.fileNamePattern.replace(/<DATE>/ig, LoggerDriverInterface._FormatDate(date, this.dateFormat))
  }

  _GetLogDirectory () {
    let dir = this.logDirectory
    if (dir !== '' && dir.slice(-1) !== '/') {
      dir += '/'
    }
    return dir
  }

  _GetPath () {
    return this._GetLogDirectory() + this._GetFileName()
  }

  Log (message, type) {
    throw new Error("Log method not implemented");
  }
}

module.exports = FileDriverInterface
