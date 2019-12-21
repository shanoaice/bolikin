function prettyError({ error, msg }, reporter) {
  const errorMsg = `${error.message}
  Message: ${msg}
  Stack Trace:
  ${error.stack}`
  reporter.emit('data', errorMsg)
}

module.exports = prettyError
