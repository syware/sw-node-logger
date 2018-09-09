let LoggerDriverInterface = require('../interfaces/LoggerDriverInterface')

class ConsoleDriver extends LoggerDriverInterface {
  constructor (options = {}) {
    super(options)

    this.useColors = options.useColors || true
  }

  static _GetColor (type, text) {
    switch (type) {
      case 'DEBUG':
        return '\x1b[4m\x1b[37m' + text + '\x1b[0m'
      case 'INFO':
        return '\x1b[32m' + text + '\x1b[0m'
      case 'WARN':
        return '\x1b[33m\x1b[1m' + text + '\x1b[0m'
      case 'ERROR':
        return '\x1b[31m\x1b[5m\x1b[1m' + text + '\x1b[0m'
      case 'FATAL':
        return '\x1b[41m\x1b[5m\x1b[37m' + text + '\x1b[0m'
      default:
        throw new Error('Unmanaged type')
    }
  }

  ConsoleFormat (message, type) {
    let colorType = this.useColors ? ConsoleDriver._GetColor(type, type) : type
    let colorMessage = this.useColors ? '\x1b[34m' : ''
    return colorMessage + this.Format(message, colorType)
  }

  Log (message, type) {
    console.log(this.ConsoleFormat(message, type))
  }
}

module.exports = ConsoleDriver
