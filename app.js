const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

//please save service account json file to local.json
var serviceAccount = require('./local.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});

const db = admin.database();
const ref = db.ref("data");

app.use(bodyParser.json({type: 'application/json'}));

app.get('/something', function (req, res) {
  const record = ref.child('records');
  record.once("value", function(snapshot) {
    res.send(snapshot.val())
  });
});

app.post('/something', function (req, res) {
  const someRef = ref.child("records");
  const someNewData = someRef.push();
  const whatToInsert = Object.keys(req.body).length > 0 ? req.body : { someField: 'somevalue' };
  someNewData.set(whatToInsert);

  res.send(someNewData.key);
});

app.listen(3009, () => console.log('Example app listening on port 3009!'))
