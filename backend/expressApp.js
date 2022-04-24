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

// Gestion des erreurs
const dataError = (res, message, err) => {
    res.code(400);
    console.error(message, err);
    res.json({error: message});
}

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

// Récupération de tous les produits
expressApp.get("/product/all", (req, res, next) => {
    Product.find()
        .then((products) => {
            res.status(200);
            res.json({products});
        })
        .catch(err => dataError(res, "Impossible de récupérer les produits", err))
        .finally(() => next())
    ;
});

// Récupération un produit grâce à son ID
expressApp.get("/product/get/:id", (req, res, next) => {
    Product.findById(req.params.id)
        .then((product) => res.json(product))
        .catch(err => dataError(res, "Impossible de récupérer ce produit", err))
        .finally(() => next())
    ;
});

// Récupération un produit sur base d'un critère
expressApp.get("/product/find/:key-:value", (req, res, next) => {
    const search = {};
    search[req.params.key] = req.params.value;
    Product.findOne(search)
        .then((product) => {res.json({product});})
        .catch(err => dataError(res, "Impossible de trouver ce produit", err))
        .finally(() => next())
    ;
});

// Ajout d'un produit avec mongoose
expressApp.post("/product/add", (req, res, next) => {
    const product = new Product({...req.body});
    Product.save()
        .then(() => {
            res.status(201);
            res.json({message: "ok"});
        })
        .catch(err => dataError(res, "Impossible d'enregistrer le produit", err))
        .finally(() => next())
    ;
});

// Modification d'un produit avec mongoose
expressApp.put("/product/edit/:id", (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    data.id = id;
    Product.updateOne({_id:  data.id}, {...data})
        .then(result => res.json(result))
        .catch(err => dataError(res, "Impossible de mettre à jour le produit", err))
        .finally(() => next())
    ;
});

// Suppression d'un produit avec mongoose
expressApp.delete("/product/delete/:id", (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => res.json(product))
        .catch(err => dataError(res, "Impossible de supprimer ce produit", err))
        .finally(() => next())
    ;
});



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