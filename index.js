let Logger = require('./lib/Logger')
let LoggerDriverInterface = require('./lib/interfaces/LoggerDriverInterface')

const DRIVERS = {
  CONSOLE: require('./lib/drivers/ConsoleDriver'),
  FILEROLLING: require('./lib/drivers/FileRollingDriver'),
  SYSLOG: require('./lib/drivers/SyslogDriver')
}

Logger.DRIVERS = DRIVERS
Logger.LoggerDriverInterface = LoggerDriverInterface

module.exports = Logger