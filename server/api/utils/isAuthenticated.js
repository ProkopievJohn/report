export function isAuthenticated(ctx, next) {
  if (ctx.state && ctx.state.user && typeof ctx.state.user._id === 'string') {
    return next()
  } else {
    return ctx.accessDenied('Unauthorized')
  }
}
