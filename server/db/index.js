import { MongoClient } from 'mongodb'
import config from '../../config/server'

let db

export default function connectToDb() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.db.uri, config.db.options, (err, database) => {
      if (err) {
        return reject(err)
      }
      resolve(database)
      console.log('[INFO] DB is connected')
      db = database
    })
  })
}

export const getDb = collection => {
  if (!db) {
    throw new Error('DB is not connected!')
  }
  return db.collection(collection)
}
