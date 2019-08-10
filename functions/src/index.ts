// Import the Dialogflow module from the Actions on Google client library.
import { dialogflow } from 'actions-on-google';
// Import the firebase-functions package for deployment.
import * as functions from 'firebase-functions';
import Vibrant from 'node-vibrant';

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('favorite color', (conv, { color }) => {
  // @ts-ignore
  const luckyNumber = color.length;
  // Respond with the user's lucky number and end the conversation.
  conv.close(`Your lucky number is ${luckyNumber}`);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
const dialogflowFirebaseFulfillment = functions.https.onRequest(app);

const vibrantPalette = functions.https.onRequest((request, response) => {
  const { img } = request.query;

  Vibrant.from(img).getPalette()
    .then(palette => {
      response.send(palette);
    });
});

export {
  dialogflowFirebaseFulfillment,
  vibrantPalette,
};
