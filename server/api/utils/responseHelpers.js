export default function responseHelpers(ctx, next) {
  ctx.resolve = payload => {
    ctx.response.status = 200
    ctx.response.body = {
      payload,
      success: true
    }
  }

  ctx.notFound = message => {
    ctx.response.status = 404
    ctx.response.body = {
      payload: {
        message: message || 'Not Found'
      },
      success: false
    }
  }

  ctx.accessDenied = message => {
    ctx.response.status = 401
    ctx.response.body = {
      payload: {
        message: message || 'Access Denied'
      },
      success: false
    }
  }

  ctx.invalidData = message => {
    ctx.response.status = 400
    ctx.response.body = {
      payload: {
        message: message || 'Invalid Data'
      },
      success: false
    }
  }

  ctx.fail = (message, error) => {
    ctx.response.status = 500
    ctx.response.body = {
      payload: {
        message,
        error
      },
      success: false
    }
  }
  return next()
}
