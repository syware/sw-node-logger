# sw-node-logger
> An easy to use logger for node js

## Quick start

```
let Logger = require('sw-node-logger')

// Instantiate a Logger
let logger = new Logger([
  // Instantiate the driver(s) you want to use
  new Logger.DRIVERS.CONSOLE(),
  new Logger.DRIVERS.FILEROLLING({ logDirectory: './log' })
])

logger.Log('This is info')
```

## Documentation

### How to log

When the logger is instantiated, you simply need to call the Log method. By default the log type is INFO but you can either change the default log type or specify it for a specific log

```
// Default log type is INFO
logger.Log('This is info')

// Set default to WARNING
logger.SetType(Logger.TYPES.WARN)
logger.Log('This is warn')

// Specify the type for this log
logger.Log('This is error', Logger.TYPES.ERROR)
```

### What is logged

The log types are organized by priority

- DEBUG
- INFO
- WARN
- ERROR
- FATAL

By default the lvl is set to INFO. It means that everything above will be logged but not what is below. You can change the default lvl with this command.

```
// Set the minimum log lvl to display to WARNING
logger.SetLvl(Logger.TYPES.WARN)
```

## The drivers

> This library use drivers. You can specify one or many.

```
// How to set options
let options = {
  useColors: false
}

let drv = new Logger.DRIVERS.CONSOLE(options)

// Give that driver to the main Logger object
let logger = new Logger(drv)
```

### Console Driver

> This will simply log into the console

| Option | Type | Default | Description |
|--------|-------|---------|-------------|
| timestampFormat | string | 'YYYY-MM-DD HH:mm:ss' | DateTime format for the log line |
| useColors | boolean | true | Use colors in the console |

### File rolling Driver

> This will log into a file. A new file everyday

| Option | Type | Default | Description |
|--------|-------|---------|-------------|
| timestampFormat | string | 'YYYY-MM-DD HH:mm:ss' | DateTime format for the log line |
| logDirectory | string | './' | The directory where to store the logs |
| fileNamePattern | string | 'log-\<DATE>.log' | The filename format. \<DATE> will be automatically replaced by the date of the day |
| keepLast | integer | 10 | How many log file to keep. If it set to 0, all the files will be kept |

### Syslog Driver

> This will log into a syslog server

| Option | Type | Default | Description |
|--------|-------|---------|-------------|
| timestampFormat | string | 'YYYY-MM-DD HH:mm:ss' | DateTime format for the log line |
| srvAddress | string | 'localhost' | The address of the server |
| port | integer | 514 | The server port number |
| transport | 'TCP' or 'UDP' | 'UDP' | The transport type |
| hostName | string | computer hostname | The hostname of your machine displayed on the syslog |
| appName | string | 'MyApp' | The application name |

### Custom Driver

> How to build your custom driver

The minimum required is to use a constructor with options and a Log method which get message and type

```
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
```
