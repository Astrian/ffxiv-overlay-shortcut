import Koa from 'koa'
import Router from 'koa-router'
import Body from 'koa-body'

let exposeAddress = ""

const app = new Koa()

app.use(Body())

const router = new Router()

router.get('/', (ctx) => {
  ctx.status = 302
  ctx.redirect(`https://overlays.ffcafe.cn/kagerou/overlay/?HOST_PORT=${exposeAddress}`)
})

router.post('/', (ctx) => {
  if (!ctx.request.body || !ctx.request.body.exposeAddress) {
    ctx.status = 400
    return
  }
  exposeAddress = ctx.request.body.exposeAddress
  ctx.status = 204
})

app.use(router.routes())
app.listen(3000)