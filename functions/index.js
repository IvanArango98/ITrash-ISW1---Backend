const functions = require("firebase-functions");
const app = require("./app");
exports.api_ITrash = functions.https.onRequest(app);