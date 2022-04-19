const express = require('express');

const expressApp = express();

expressApp.use((req, res, next) => {
    console.log("Requête reçue => " + req.url);
    next();
});

expressApp.use((req, res, next) => {
    res.status(200);
    next();
});

expressApp.use((req, res, next) => {
    res.send('Hello World !');
    next();
});

expressApp.use((req, res) => {
    console.log("Code response: " + res.statusCode);
    console.log("Requête terminée, réponse envoyée au client");
})

module.exports = expressApp;