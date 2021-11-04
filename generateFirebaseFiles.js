const fs = require('fs')

fs.stat('.firebaserc', err => {
  if (err) fs.writeFileSync('.firebaserc', process.env.FIREBASERC)
})
fs.stat('firebase-config.json', err => {
  if (err) fs.writeFileSync('firebase-config.json', process.env.FIREBASE_CONFIG_JSON)
})
