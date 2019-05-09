const md5 = require('md5')
const router = require('koa-router')();

const db = require('../utils/db')
const util = require('../utils/tools')
const Tips = require('../utils/tip');


router.post('/user/register', async (ctx) => {
  let {name, sex, phone, password} = ctx.request.body;
  let uuid = util.get_uuid()
  let sql = 'INSERT INTO user (name, sex, phone, password, uuid) VALUES (?, ?, ?, ?, ?)',
    value = [name, sex, phone, md5(password), uuid];
  await db.query(sql, value).then(res => {
    ctx.body = { ...Tips[0], data:{uuid, name, sex, phone} };
  }).catch(e => {
    ctx.body = Tips[1009];
  })
})

router.post('/user/login', async (ctx) => {
  let {name, password} = ctx.request.body;

  let sql = 'SELECT name, sex, uuid, phone FROM user WHERE name = ? and password = ?',
    value = [name, md5(password)];
  await db.query(sql, value).then(res => {
    if (res && res.length > 0) {
      ctx.body = { ...Tips[0], data: res[0] };
    } else {
      ctx.body = Tips[1006];
    }
  }).catch(e => {
    ctx.body = Tips[1002];
  })
})

router.post('/user/update', async (ctx) => {
  let {name, sex, phone, password, uuid} = ctx.request.body;
  let sql = 'UPDATE user set name = ?, sex = ?, password = ?, phone = ? where uuid = ?',
    value = [name, sex, md5(password), phone, uuid]
  await db.query(sql, value).then(res => {
    ctx.body = { ...Tips[0] };
  }).catch(e => {
    ctx.body = Tips[1002];
  })
})

module.exports = router