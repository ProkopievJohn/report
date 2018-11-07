import bcrypt from 'bcrypt'
import { getDb } from './index'
import UserSchema from './schemas/user'

export default {
  dbName: 'users',
  find(...opts) {
    const db = getDb(this.dbName)
    return db.find(...opts).toArray()
  },
  findOne(...opts) {
    const db = getDb(this.dbName)
    return db.findOne(...opts)
  },

  async insertOne(doc) {
    const db = getDb(this.dbName)
    await UserSchema.validate(doc)
    return db.insertOne(doc)
  },
  async update(doc) {
    const db = getDb(this.dbName)
    await UserSchema.validate(doc)
    return db.update({_id: doc._id}, doc)
  },
  async authenticate(credentials) {
    const { email, password } = credentials

    const db = getDb(this.dbName)
    const user = await db.findOne({
      'email.address': email
    })

    if (user && !bcrypt.compareSync(password, user.password)) {
      return null
    }

    return user
  }
}
