const fs = require('fs')

fs.writeFileSync('.firebaserc', process.env.FIREBASERC)
fs.writeFileSync('firebase-config.json', process.env.FIREBASE_CONFIG_JSON)
