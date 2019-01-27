import electron from 'electron'
import datastore from 'nedb-promise'

const db = datastore({
  filename: `${electron.remote.app.getPath('userData')}/projects.db`,
  autoload: true
})

export function getAll () {
  return db.find({})
}

export function remove (data) {
  return db.remove(data, {})
}

export function create (data) {
  return db.insert(data)
}

export function update (query, update) {
  return db.update(query, update)
}
