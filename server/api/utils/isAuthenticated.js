export function isAuthenticated(ctx, next) {
  console.log('ctx.state: ', ctx.state)
  if (ctx.state && ctx.state.user && typeof ctx.state.user._id === 'string') {
    return next()
  } else {
    return ctx.accessDenied('Unauthorized')
  }
}
