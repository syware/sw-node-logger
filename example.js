let Logger = require('./index')

class MyDriver extends Logger.LoggerDriverInterface {
  constructor (options) {
    super(options)
  }

  Log (message, type) {
    console.log(message, type)
    // You can use the common formatting method
    // to get a clean line
    console.log(this.Format(message, type))
  }
}

let logger = new Logger([
  new MyDriver()
])

logger.Log('Voilà', Logger.TYPES.ERROR)