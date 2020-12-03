const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");
const { url } = require('inspector');

admin.initializeApp();

const app = express();

app.use(cors);

app.get('/', (req, res) => {
    cors(req, res, async () => {      
    const getUser = await admin.firestore().collection('users').get();

    let users = [];
    getUser.forEach(doc => {
        let id = doc.id;
        let data = doc.data();
        users.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(users));
    })
});


app.get("/:id", (req, res) => {
    cors(req, res, async () => {      
        const snapshot = await admin.firestore().collection('users').doc(req.params.id).get();
        const userId = snapshot.id;
        const userData = snapshot.data();
        res.status(200).send(JSON.stringify({id: userId, ...userData}));
    })
  });

app.put('/:id', (req, res) => {
    
    cors(req, res, async () => {
    const body = req.body;
    await admin.firestore().collection('users').doc(req.params.id).update({
        ...body
    });

    res.status(200).send();
    })
});

app.post('/', (req, res) => {
    
    cors(req, res, async () => {
    const user = req.body;

    await admin.firestore().collection('users').add(user);

    res.status(200).send();
    })
});

app.delete("/:id", (req, res) => {

    cors(req, res, async () => {
    await admin.firestore().collection("users").doc(req.params.id).delete();
    
    res.status(200).send();
    })
  })

exports.user = functions.https.onRequest(app);

exports.corsEnabledFunction = (req, res) => {
    // Set CORS headers for preflight requests
    // Allows GETs from any origin with the Content-Type header
    // and caches preflight response for 3600s
  
    res.set('Access-Control-Allow-Origin', '*');
  
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
      res.send('Hello World!');
    }
  };

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
exports.getKennesawInfectedCases = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {      
        const getUser = await admin.firestore().collection('users').where("isInfected", "==", true).where("campus", "==", "Kennesaw").get();
        
        let users = [];
        getUser.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            users.push({id, ...data});
        });
    
        res.status(200).send(JSON.stringify(users));
        })
});
exports.getMariettaInfectedCases = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {      
        const getUser = await admin.firestore().collection('users').where("isInfected", "==", true).where("campus", "==", "Marietta").get();
        
        let users = [];
        getUser.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            users.push({id, ...data});
        });
    
        res.status(200).send(JSON.stringify(users));
        })
});
exports.getStudentInfectedCases = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {      
        const getUser = await admin.firestore().collection('users').where("isInfected", "==", true).where("type", "==", "Student").get();
        
        let users = [];
        getUser.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            users.push({id, ...data});
        });
    
        res.status(200).send(JSON.stringify(users));
        })
});

exports.getFacultyInfectedCases = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {      
        const getUser = await admin.firestore().collection('users').where("isInfected", "==", true).where("type", "==", "Faculty").get();
        
        let users = [];
        getUser.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            users.push({id, ...data});
        });
    
        res.status(200).send(JSON.stringify(users));
        })
});
exports.getStudentRecoveredCases = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {      
        const getUser = await admin.firestore().collection('users').where("isInfected", "==", false).where("type", "==", "Student").get();
        
        let users = [];
        getUser.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            users.push({id, ...data});
        });
    
        res.status(200).send(JSON.stringify(users));
        })
});

exports.getFacultyRecoveredCases = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {      
        const getUser = await admin.firestore().collection('users').where("isInfected", "==", false).where("type", "==", "Faculty").get();
        
        let users = [];
        getUser.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            users.push({id, ...data});
        });
    
        res.status(200).send(JSON.stringify(users));
        })
});
exports.getCaseByMonth = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {      
        const getUser = await admin.firestore().collection('users').where("isInfected", "==", false).where("month", "==", req.params.id).get();
        
        let users = [];
        getUser.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            users.push({id, ...data});
        });
    
        res.status(200).send(JSON.stringify(users), req.params);
        })
});

