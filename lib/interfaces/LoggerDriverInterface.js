class LoggerDriverInterface {
  constructor (options) {
    if (new.target === LoggerDriverInterface) {
      throw new Error('Cannot construct Abstract instances directly')
    }

    this.timestampFormat = options.timestampFormat || 'YYYY-MM-DD HH:mm:ss'
  }

  static _FormatDate (date, format) {
    if (!(date instanceof Date)) {
      throw new Error('Not a valid Date format')
    }
    if (typeof format  !== 'string' || format === '') {
      throw new Error('Not a valid format')
    }

    return format.replace(/YYYY/g, date.getFullYear())
      .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
      .replace(/DD/g, ('0' + date.getDate()).slice(-2))
      .replace(/HH/g, ('0' + date.getHours()).slice(-2))
      .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
      .replace(/ss/ig, ('0' + date.getSeconds()).slice(-2))
  }

  _GetFormattedTimestamp (date = new Date()) {
    return LoggerDriverInterface._FormatDate(date, this.timestampFormat)
  }

  Format (message, type) {
    return this._GetFormattedTimestamp() + '\t' + type + '\t' + message
  }

  Log (message, type) {
    throw new Error("Log method not implemented");
  }
}

module.exports = LoggerDriverInterface
