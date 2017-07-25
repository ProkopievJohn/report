export default () => (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', ctx.get('Origin'))
  ctx.response.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
  ctx.response.set('Access-Control-Allow-Headers', 'Authorization, Content-Type')
  if (ctx.method === 'OPTIONS') {
    ctx.response.status = 204
  } else {
    return next()
  }
}
