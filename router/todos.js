const router = require('koa-router')();
const mongoose = require('mongoose');

const Data = require('../models/todos');
const util = require('../utils/tools');
const Tips = require('../utils/tip');

mongoose.connect('mongodb://127.0.0.1:27017/todo')
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected success")
})

router.post('/todo/add',
  async (ctx, next) => {
    // id 为 user 的 uuid
    let {id, title, deadline, top, done, content} = ctx.request.body;
    let uuid = util.get_uuid();
    let data = await new Data({
      uuid,
      id,
      title,
      content,
      deadline,
      top,
      done
    });
    await data.save();
    let datas = await Data.find({id: id});
    ctx.body = { ...Tips[0], data: datas };
  },
);

router.post('/todo/user', async (ctx) => {
  let {id} = ctx.request.body;
  let data = await Data.find({id: id});
  ctx.body = { ...Tips[0], data: data };
})

router.post('/todo/delete', async (ctx) => {
  let {uuid} = ctx.request.body;
  let data = await Data.remove({uuid: uuid});
  ctx.body = { ...Tips[0], data: data };
})

module.exports = router
