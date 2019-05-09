const uuid = require('uuid')

let util = {
  get_uuid() {
    return uuid.v4()
  }
}

module.exports = util