class ProductsController {

    static getProducts = (req, res, next, sequelize) => {
        sequelize.query(`SELECT * FROM product`)
            .then(([products, metadata]) => {
                console.log(products);
                res.json(products);
            })
            .catch(err => {
                res.json({error: "Impossible de récupérer les produits"});
                console.error(`Une erreur est survenue en récupérant les produits: ${err}`);
            })
            .finally(() => {
                next();
            })
        ;
    }

    static addProduct = (req, res, next, sequelize) => {
        const body = req.body;
        if ("name" in body && "description" in body && "quantity" in body) {
            sequelize.query(`INSERT INTO product (name, description, quantity)
                             VALUES ("${body.name}", "${body.description}", "${body.quantity}")`)

                .then(() => res.json({
                    message: "ok"
                }))

                .catch(err => res.json({
                    error: `impossible d'ajouter le produit: ${err}`
                }))

                .finally(() => next())
            ;
        } else {
            res.status(400);
            res.json({
                error: "Missing parameters"
            });
        }
        next();
    }

    static editProduct = (req, res, next, sequelize) => {
        const body = req.body;
        if ("id" in body && "name" in body && "description" in body && "quantity" in body) {
            sequelize.query(`UPDATE product set name = "${body.name}", description = "${body.description}", quantity = "${body.quantity}" 
               WHERE id = ${body.id}`)

                .then(() => res.json({
                    message: "ok"
                }))

                .catch(err => res.json({
                    error: `impossible de modifier le produit: ${err}`
                }))

                .finally(() => next())
            ;
        } else {
            res.status(400);
            res.json({
                error: "Missing parameters"
            });
        }
        next();
    }

    static deleteProduct = (req, res, next, sequelize) => {
        const body = req.body;
        if ("id" in body) {
            sequelize.query(`DELETE FROM product WHERE id = ${body.id}`)

                .then(() => res.json({
                    message: "ok"
                }))

                .catch(err => res.json({
                    error: `impossible de supprimer le produit: ${err}`
                }))

                .finally(() => next())
            ;
        } else {
            res.status(400);
            res.json({
                error: "Missing parameters"
            });
        }
        next();
    }
}

module.exports = ProductsController;
