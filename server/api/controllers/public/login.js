const login = async (ctx, next) => {
  const {email, password} = ctx.request.body
  if (!email || !password) {
    return next()
  }
  try {
    return next()
  } catch (err) {
    if (err) {
      console.log(err)
    }
    return next()
  }
}

export default login
