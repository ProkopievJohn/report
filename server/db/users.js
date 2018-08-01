import bcrypt from 'bcrypt'
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
  },
  async update(doc) {
    const db = getDb('users')
    await UserSchema.validate(doc)
    return db.update({_id: doc._id}, doc)
  },
  async authenticate(credentials) {
    const { email, password } = credentials

    const db = getDb('users')
    const user = await db.findOne({
      'email.address': email
    })

    if (user && !bcrypt.compareSync(password, user.password)) {
      return null
    }

    return user
  }
}
