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

/*expressApp.use((req, res, next) => {
    res.send('Hello World !');
    next();
});*/

expressApp.get("/", (req, res, next) => {
    const response = {
      message: "Hello Wooooooorld",
    }
    res.json(response);
    next();
});

expressApp.get("/hello", (req, res, next) => {
    res.json({coucou: "Coucou !"});
    next();
});

expressApp.get("/hello/:name/:age?", (req, res, next) => {
    const params = req.params;
    const message = undefined === params.age ? `Coucou ${req.params.name}` : `Coucou ${req.params.name}, vous avez ${params.age}`;
    res.json({coucou: message });
    next();
});

// Handle 404 errors
expressApp.use(function (req, res, next) {
    if (!req.route) {
        res
            .status(404)
            .end()
        ;
        next();
    }
})

expressApp.use((req, res) => {
    console.log("Code response: " + res.statusCode);
    console.log("Requête terminée, réponse envoyée au client");
})

module.exports = expressApp;