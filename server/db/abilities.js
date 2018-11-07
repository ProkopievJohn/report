import { getDb } from './index'
import AbilitySchema from './schemas/ability'

export default {
  dbName: 'abilities',
  find(...opts) {
    const db = getDb(this.dbName)
    return db.find(...opts).toArray()
  },
  count(...opts) {
    const db = getDb(this.dbName)
    return db.estimatedDocumentCount(...opts)
  },
  findOne(...opts) {
    const db = getDb(this.dbName)
    return db.findOne(...opts)
  },

  async insertOne(doc) {
    const db = getDb(this.dbName)
    await AbilitySchema.validate(doc)
    return db.insertOne(doc)
  },
  async update(doc) {
    const db = getDb(this.dbName)
    await AbilitySchema.validate(doc)
    return db.update({_id: doc._id}, doc)
  }
}
