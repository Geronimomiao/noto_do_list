const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');

const todos = require('./router/todos')
const users = require('./router/users')

const app = new Koa();

router
  .use('/v1', todos.routes())
  .use('/v1', users.routes())


// 允许跨域
app.use(cors());
app.use(bodyParser());
app.use(router.routes());

app.listen(3200);

