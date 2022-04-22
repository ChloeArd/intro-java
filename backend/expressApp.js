const express = require('express');
const sequelize = require("./db");
const ProductsController = require("./Controller/ProductsController");
const expressApp = express();

expressApp.use(express.json());

expressApp.use((req, res, next) => {
    console.log("Requête reçue => " + req.url);
    next();
});

expressApp.use((req, res, next) => {
    res.setHeader("Content-Type0", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.status(200);
    next();

})

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

/*expressApp.get("/hello", (req, res, next) => {
    res.json({coucou: "Coucou !"});
    next();
});*/

expressApp.get("/products", (req, res, next) => {
    ProductsController.getProducts(req, res, next, sequelize);
});

expressApp.post("/product/add", (req, res, next) => {
    ProductsController.addProduct(req, res, next, sequelize);
});

expressApp.post("/product/edit", (req, res, next) => {
    ProductsController.editProduct(req, res, next, sequelize);
});

expressApp.post("/product/delete", (req, res, next) => {
    ProductsController.deleteProduct(req, res, next, sequelize);
});

/*expressApp.get("/hello/:name/:age?", (req, res, next) => {
    const params = req.params;
    const message = undefined === params.age ? `Coucou ${req.params.name}` : `Coucou ${req.params.name}, vous avez ${params.age}`;
    res.json({coucou: message });
    next();
});

expressApp.post("/message/add", (req, res, next) => {
    console.log(req.body);
    res.json({status: "ok"});
    next();
});

expressApp.post("/message/add/:responseProperty", (req, res, next) => {
    const property = req.params.responseProperty;
    const response = {};
    response[property] = "ok";
    res.json(response);
    next();
})*/

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