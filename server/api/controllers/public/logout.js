import { ObjectId } from 'mongodb'
import UserCollection from '../../../db/users'

const logout = async (ctx, next) => {
  const { user = {} } = ctx.state
  const { _id: userId = '' } = user

  if (!userId) {
    return ctx.notFound()
  }

  const currentUser = await UserCollection.findOne({_id: ObjectId(userId)})

  if (currentUser) {
    const newUser = {
      ...currentUser,
      lastSeen: new Date()
    }
    await UserCollection.update(newUser)

    return ctx.resolve({ ...newUser, password: null })
  } else {
    return ctx.notFound()
  }
}

export default logout
