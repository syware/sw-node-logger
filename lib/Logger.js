let LoggerDriverInterface = require('./interfaces/LoggerDriverInterface')

const LVLS = [
  'DEBUG',
  'INFO',
  'WARN',
  'ERROR',
  'FATAL'
]

const TYPES = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL'
}

class Logger {
  constructor (driver) {
    // No driver
    if (!driver) throw new Error('You must at least specify a driver')
    // Driver is an array but empty
    if (Array.isArray(driver) && driver.length === 0) throw new Error('You must at least specify a driver')
    // Driver is an array but an item inside is not a LoggerDriver
    if (Array.isArray(driver) && driver.filter(drive => !(drive instanceof LoggerDriverInterface)).length > 0) {
      throw new Error('At least one driver is not a LoggerDriver')
    }
    // Driver is not an object or not a LoggerDriver
    if (!(Array.isArray(driver)) && ((typeof driver !== 'object') || !(driver instanceof LoggerDriverInterface))) {
      throw new Error('The driver is not a LoggerDriver')
    }

    // Set drivers
    if (Array.isArray(driver)) {
      this._drivers = driver
    } else {
      this._drivers = [driver]
    }

    this._type = 'INFO'
    this._lvl = 'INFO'
  }

  SetLvl (lvl) {
    if (!(lvl in TYPES)) throw new Error('Unsuported level type')

    this._lvl = lvl
  }

  SetType (type) {
    if (!(type in TYPES)) throw new Error('Unsuported log type')

    this._type = type
  }

  GetType () {
    return this._type
  }

  Log (message, type = null) {
    let tmpType = type || this.GetType()

    // Test log type
    if (!(tmpType in TYPES)) throw new Error('Unsuported log type')

    // Test log lvl
    let lvlIndex = LVLS.findIndex(element => element === this._lvl)
    let logIndex = LVLS.findIndex(element => element === tmpType)

    if (logIndex >= lvlIndex) {
      this._drivers.forEach((driver) => {
        driver.Log(message, tmpType)
      })
    }
  }
}

Logger.TYPES = TYPES

module.exports = Logger
