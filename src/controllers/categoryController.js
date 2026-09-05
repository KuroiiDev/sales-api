import { Category } from "../models/Category.js";

export const CategoryController = {
    async create(req, res) {
        try {
            const { name } = req.body;
            const category = await Category.create(name);
            res.status(201).json(category);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async getAll(req, res) {
        try {
            const categories = await Category.getAll();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {

            const { id } = req.params;
            const category = await Category.getById(id);
            res.json(category);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const category = await Category.update(id, name);
            res.json(category);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async remove(req, res) {
        try {
            const { id } = req.params;
            const result = await Category.remove(id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};