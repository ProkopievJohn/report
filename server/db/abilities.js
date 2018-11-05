import { getDb } from './index'
import AbilitySchema from './schemas/ability'

export default {
  dbName: 'abilities',
  find(...opts) {
    const db = getDb(this.dbName)
    return db.find(...opts).toArray()
  },
  findOne(...opts) {
    const db = getDb(this.dbName)
    return db.findOne(...opts)
  },

  async insert(doc) {
    const db = getDb(this.dbName)
    await AbilitySchema.validate(doc)
    return db.insert(doc)
  },
  async update(doc) {
    const db = getDb(this.dbName)
    await AbilitySchema.validate(doc)
    return db.update({_id: doc._id}, doc)
  }
}
