const nodeDeepEqual = require('deep-equal')
const ASSERTION_MESSAGE_DEFAULT = 'no message provided'

class assert {
  /**
   *
   * @param {Object} param Config object
   * @param {src/index.js~EventEmitter} param.EventEmitter The EventEmitter instance
   * @param {src/index.js~test}
   */
  constructor({ EventEmitter, test }) {
    /**
     * The EventEmitter instance
     * @private
     */
    this._eventEmitter = EventEmitter
    /**
     * The test function (used to create subtests)
     * @private
     */
    this._test = test
    /**
     * How many assertions you want to run
     * @private
     */
    this._plan = 0
    /**
     * Actual assertions ran
     * @private
     */
    this._planCount = 0
  }

  /**
   * Manually fail a test
   * @param {string} [msg] Optional message
   */
  fail(msg = ASSERTION_MESSAGE_DEFAULT) {
    this._eventEmitter.emit('fail', msg)
  }

  /**
   * Manually pass a test
   * @param {string} [msg] Optional message
   */
  pass(msg = ASSERTION_MESSAGE_DEFAULT) {
    this._eventEmitter.emit('pass', msg)
  }

  /**
   * Skip a test
   * @param {string} [msg] Optional message
   */
  skip(msg = ASSERTION_MESSAGE_DEFAULT) {
    this._eventEmitter.emit('skip', msg)
  }

  /**
   * Assert *val* to be truthy
   * @param {*} val
   * @param {string} [msg] Optional message
   */
  truthy(val, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (val != true) {
      this._eventEmitter.emit(
        'assertionFail',
        new Error(
          `Assertion Failed: Expected value to be truthy, recieved ${Boolean(
            val
          )}`
        ),
        msg
      )
    }
  }

  /**
   * Assert *val* to be falsy
   * @param {*} val
   * @param {string} [msg] Optional message
   */
  falsy(val, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (val != false) {
      this._eventEmitter.emit(
        'assertionFail',
        new Error(
          `Assertion Failed: Expected value to be falsy, recieved ${Boolean(
            val
          )}`
        ),
        msg
      )
    }
  }

  /**
   * Assert *val* to be true
   * @param {*} val
   * @param {string} msg Optional message
   */
  true(val, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (val !== true) {
      this._eventEmitter.emit(
        'assertionFail',
        new Error(
          `Assertion Failed: Expected value to be true, recieved ${val}`
        ),
        msg
      )
    }
  }

  /**
   * Assert *val* to be false
   * @param {*} val
   * @param {string} msg Optional message
   */
  false(val, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (val !== false) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Expected value to be false, recieved ${val}`
        ),
        msg
      )
    }
  }

  /**
   * Assert actual is equal to (==) expected
   * @param {*} actual
   * @param {*} expected
   * @param {string} msg Optional message
   */
  is(actual, expected, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (actual != expected) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Expected value to be ${expected}, recieved ${actual}`
        ),
        msg
      )
    }
  }

  not(actual, expected, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (actual == expected) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Didn't expect value to be ${expected}, recieved ${actual}`
        ),
        msg
      )
    }
  }

  strictEqual(actual, expected, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (actual !== expected) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Expected value to be ${expected}, recieved ${actual}`
        ),
        msg
      )
    }
  }

  strictNotEqual(actual, expected, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (actual === expected) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Didn't expect value to be ${expected}, recieved ${actual}`
        ),
        msg
      )
    }
  }

  deepEqual(actual, expected, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (!nodeDeepEqual(actual, expected)) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Expected value to be ${expected}, recieved ${actual}`
        ),
        msg
      )
    }
  }

  notDeepEqual(actual, expected, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (nodeDeepEqual(actual, expected)) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Didn't expect value to be ${expected}, recieved ${actual}`
        ),
        msg
      )
    }
  }

  strictDeepEqual(actual, expected, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (!nodeDeepEqual(actual, expected, { strict: true })) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Expected value to be ${expected}, recieved ${actual}`
        ),
        msg
      )
    }
  }

  strictNotDeepEqual(actual, expected, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (nodeDeepEqual(actual, expected, { strict: true })) {
      this._eventEmitter.emit(
        'assertionFailure',
        new Error(
          `Assertion Failed: Didn't expect value to be ${expected}, recieved ${actual}`
        ),
        msg
      )
    }
  }

  ifError(error, msg = ASSERTION_MESSAGE_DEFAULT) {
    if (error == false) {
      this._eventEmitter.emit(
        'assertionFailue',
        new Error(
          `Assertion Failed: Expect value to be falsy, recieved truthy ${error}`
        ),
        error.message || msg
      )
    }
  }

  /**
   * Verify test plan. No need to call this manually since bolikin will do it for you.
   * @private
   */
  _verifyPlan() {
    if (this._plan) {
      if (this._planCount !== this._plan) {
        this._eventEmitter.emit('planFail', this._plan, this._planCount)
      }
    }
  }
}

module.exports = assert
