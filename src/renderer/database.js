import electron from 'electron'
import Datastore from 'nedb'

const db = {}

db.pomodoro = new Datastore(`${electron.remote.app.getPath('userData')}/sessions.db`)
db.pomodoro.loadDatabase()

export default db
