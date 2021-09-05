import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
// 	functions.logger.info('Hello logs!', {structuredData: true});
// 	response.send('Hello from Firebase!');
// });

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import signaling from './signaling';
var cors = require('cors');

const app: express.Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/config', (req, res) => res.json({useWebSocket: true, startupMode: 'public', logging: 'dev'}));
app.use('/signaling', signaling);
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
	functions.logger.info('Hello logs!', {structuredData: true});
	res.send('Hello from Firebase! at 508');
});
export const helloWorld = functions.https.onRequest(app);