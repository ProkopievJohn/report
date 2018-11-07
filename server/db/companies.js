import { getDb } from './index'
import CompanySchema from './schemas/company'

export default {
  dbName: 'companies',
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
    await CompanySchema.validate(doc)
    return db.insertOne(doc)
  },
  async update(doc) {
    const db = getDb(this.dbName)
    await CompanySchema.validate(doc)
    return db.update({_id: doc._id}, doc)
  }
}
