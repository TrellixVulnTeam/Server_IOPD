const Product = require('../models/Product')
const shortid = require('shortid')
const slugify = require('slugify')
const Category = require('../models/Category')


class ProductController {
    create(req, res, next) {
        var productPicture = []
        if (req.files.length > 0) {
            productPicture = req.files.map((file) => {
                return { img: file.filename }
            })
        }
        const product = new Product({
            name: req.body.name,
            slug: slugify(req.body.name),
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            productPicture,
            category: req.body.category,
            createdBy: req.user._id,
        })
        product.save((error, product) => {
            if (error) return res.status(400).json({ error })
            if (product) {
                res.status(201).json({ product })
            }
        })

    }
    getProductBySlug(req, res, next) {
        const { slug } = req.params
        Category.findOne({ slug: slug })
            .select('_id type')
            .exec((error, category) => {
                if (error) {
                    return res.status(400).json({ error })
                }
                if (category) {
                    Product.find({ category: category._id })
                        .exec((error, products) => {
                            if (error) {
                                return res.status(400).json({ error })
                            }

                            if (category.type) {
                                if (products.length > 0) {
                                    res.status(200).json({
                                        products,
                                        priceRange: {
                                            under10tr: 10000000,
                                            under15tr: 15000000,
                                            under25tr: 25000000,
                                            under35tr: 35000000,
                                        },
                                        productsByPrice: {
                                            under10tr: products.filter(product => product.price <= 10000000),
                                            under15tr: products.filter(product => product.price > 10000000 && product.price <= 15000000),
                                            under25tr: products.filter(product => product.price > 15000000 && product.price <= 25000000),
                                            under35tr: products.filter(product => product.price > 25000000 && product.price <= 35000000)
                                        }
                                    })
                                }
                            } else {
                                res.status(200).json({ products })
                            }
                        })
                }

            })
    }
    getProductDetailsById = (req, res) => {
        const { productId } = req.params;
        if (productId) {
            Product.findOne({ _id: productId }).exec((error, product) => {
                if (error) return res.status(400).json({ error });
                if (product) {
                    res.status(200).json({ product });
                }
            });
        } else {
            return res.status(400).json({ error: "Params required" });
        }
    }
    deleteProductById = (req, res) => {
        const { productId } = req.body.payload;
        if (productId) {
            Product.deleteOne({ _id: productId }).exec((error, result) => {
                if (error) return res.status(400).json({ error });
                if (result) {
                    res.status(202).json({ result });
                }
            });
        } else {
            res.status(400).json({ error: "Params required" });
        }
    };

    getProducts = async (req, res) => {
        const products = await Product.find({ createdBy: req.user._id })
            .select("_id name price quantity slug description productPictures category")
            .populate({ path: "category", select: "_id name" })
            .exec();

        res.status(200).json({ products });
    };
}
module.exports = new ProductController();