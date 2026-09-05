import { Product } from "../models/Product.js";
export const ProductController = {
    async getAll(req, res) {
        try {
            const { category_id, categoryId } = req.query;
            const filterCategory = category_id || categoryId;
            const products = filterCategory
                ? await Product.getByCategory(filterCategory)
                : await Product.getAll();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getByCategory(req, res) {
        try {
            const { categoryId } = req.params;
            const products = await Product.getByCategory(categoryId);
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const product = await Product.getById(req.params.id);
            res.json(product);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async update(req, res) {
        try {
            const product = await Product.update(req.params.id, req.body);
            res.json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });

        }
    },
    async remove(req, res) {
        try {
            await Product.remove(req.params.id);
            res.json({ message: "Product deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};