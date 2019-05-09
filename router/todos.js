const router = require('koa-router')();
const mongoose = require('mongoose')

const Data = require('../models/todos')
const util = require('../utils/tools')

mongoose.connect('mongodb://127.0.0.1:27017/todo')
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected success")
})

router.post('/todo/add',
  async (ctx, next) => {
    let {id, title, deadline, top, done, content} = ctx.request.body;
    let uuid = util.get_uuid()
    let data = await new Data({
      uuid,
      id,
      title,
      content,
      deadline,
      top,
      done
    });
    await data.save()

    let datas = await Data.find({id: id});

  },
);

router.get('/todo/user', async (ctx) => {
  let data = await Data.find({});
  let res = {
    status: 1,
    msg: data,
  }
  ctx.body = JSON.stringify(res);
})

module.exports = router
