import { Customer } from "../models/Customer.js";
export const CustomerController = {
    async getAll(req, res) {
        try {
            const customers = await Customer.getAll();
            res.json(customers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    async getById(req, res) {
        try {
            const customer = await Customer.getById(req.params.id);
            res.json(customer);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
    async create(req, res) {
        try {
            const customer = await Customer.create(req.body);
            res.status(201).json(customer);
        } catch (err) {
            res.status(400).json({ error: err.message });

        }
    },
    async update(req, res) {
        try {
            const customer = await Customer.update(req.params.id, req.body);
            res.json(customer);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    async remove(req, res) {
        try {
            await Customer.remove(req.params.id);
            res.json({ message: "Customer deleted successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};