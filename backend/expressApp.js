const express = require('express');
const sequelize = require("./db");
const ProductsController = require("./Controller/ProductsController");
const expressApp = express();
const Product = require("./model/Product");

expressApp.use('/assets', express.static(__dirname + "/../public/build"));
expressApp.use(express.json());

//Initialisation de Mongoose
const mongoose = require("mongoose");
dbConnect = async () => await mongoose.connect(
    "mongodb+srv://ChloeArd:XkZLWfCpJprAuTXf@cluster0.8pafq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

dbConnect()
    .catch(err => {
        console.error("Erreur de connexion à la DB: " + err);
        process.exit(1);
    })
;


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
});

expressApp.get("/", (req, res, next) => {
    res.json({message: "Hello World"});
    next();
});

/*expressApp.get("/products", (req, res, next) => {
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
});*/

/*expressApp.get("/hello/:name/:age?", (req, res, next) => {
    const params = req.params;
    const message = undefined === params.age ? `Coucou ${req.params.name}` : `Coucou ${req.params.name}, vous avez ${params.age}`;
    res.json({coucou: message });
    next();
});*/

// Ajout d'un produit avec mongoose
expressApp.post("/product/add", (req, res, next) => {
    const product = new Product({...req.body});
    product.save()
        .then(() => {
            res.status(201);
            res.json({message: "ok"});
        })
        .catch(err => {
            res.status(400);
            res.json({error: "Impossible d'enregistrer le produit"});
        })
        .finally(() => next())
    ;
})

// Handle 404 errors
expressApp.use(function (req, res, next) {
    if (!req.route) {
        res.status(404).end();
        next();
    }
});

expressApp.use((req, res) => {
    console.log("Code response: " + res.statusCode, "Requête terminée, réponse envoyée au client");
});

module.exports = expressApp;