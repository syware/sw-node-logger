const syslog = require('syslog-client')
const os = require('os')
let LoggerDriverInterface = require('../interfaces/LoggerDriverInterface')

class FileRollDriver extends LoggerDriverInterface {
  constructor (options = {}) {
    super(options)

    let transport = syslog.Transport.Udp
    if (options.transport && options.transport === 'TCP') {
      transport = syslog.Transport.Tcp
    }

    this.srvAddress = options.srvAddress || 'localhost'

    this.syslogClient = syslog.createClient(this.srvAddress, {
      port: options.port || 514,
      transport: transport,
      syslogHostname: options.hostName || os.hostname(),
      appName: options.appName || 'MyApp',
      facility: syslog.Facility.System
    })

    this.syslogClient.on('error', (error) => {
      throw new Error(error)
    })
  }

  _GetSeverity (type) {
    switch (type) {
      case 'DEBUG':
        return syslog.Severity.Debug
      case 'INFO':
        return syslog.Severity.Notice
      case 'WARN':
        return syslog.Severity.Warning
      case 'ERROR':
        return syslog.Severity.Error
      case 'FATAL':
        return syslog.Severity.Critical
      default:
        throw new Error('Unmanaged syslog type')
    }
  }

  Log (message, type) {
    this.syslogClient.log(this.Format(message, type), {severity: this._GetSeverity(type)})
  }
}

module.exports = FileRollDriver
