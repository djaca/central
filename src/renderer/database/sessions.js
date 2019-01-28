import electron from 'electron'
import datastore from 'nedb-promise'

const db = datastore({
  filename: `${electron.remote.app.getPath('userData')}/sessions.db`,
  autoload: true
})

export function getForDate (date) {
  return db.find({date})
}

export function create (data) {
  return db.insert(data)
}

export function update (query, update) {
  return db.update(query, update)
}
