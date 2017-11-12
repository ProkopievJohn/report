import { getDb } from './index'
import UserSchema from './schemas/user'

export default {
  find(...opts) {
    const db = getDb('users')
    return db.find(...opts)
  },

  findOne(...opts) {
    const db = getDb('users')
    return db.findOne(...opts)
  },

  async insert(doc) {
    const db = getDb('users')
    await UserSchema.validate(doc)
    return db.insert(doc)
  }
}
