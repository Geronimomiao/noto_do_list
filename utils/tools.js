const uuid = require('uuid')

let util = {
  get_uuid() {
    return uuid.v4()
  },
  send_res(ctx, datas) {
    let res = {
      status: 1,
      msg: datas,
    }
    ctx.body = JSON.stringify(res);
  }
}

module.exports = util