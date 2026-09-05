import { Customer } from "../models/Customer.js";
import { Product } from "../models/Product.js";
import { Transaction } from "../models/Transaction.js";

export const TransactionController = {
    async create(req, res) {
        try {
            const { customer_id, product_id, quantity = 1 } = req.body;

            // 1. Validasi input wajib
            if (!customer_id || !product_id) {
                return res.status(400).json({
                    error: "customer_id dan product_id wajib diisi",
                });
            }

            const qty = Number(quantity);
            if (isNaN(qty) || qty <= 0 || !Number.isInteger(qty)) {
                return res.status(400).json({
                    error: "quantity harus berupa bilangan bulat positif lebih dari 0",
                });
            }

            // 2. Cek apakah customer terdaftar
            let customer;
            try {
                customer = await Customer.getById(customer_id);
            } catch {
                return res.status(404).json({ error: "Customer tidak ditemukan" });
            }
            if (!customer) {
                return res.status(404).json({ error: "Customer tidak ditemukan" });
            }

            // 3. Cek apakah product terdaftar
            let product;
            try {
                product = await Product.getById(product_id);
            } catch {
                return res.status(404).json({ error: "Produk tidak ditemukan" });
            }
            if (!product) {
                return res.status(404).json({ error: "Produk tidak ditemukan" });
            }

            // 4. Cek ketersediaan stok produk
            if (product.stock < qty) {
                return res.status(400).json({
                    error: `Stok produk tidak mencukupi. Stok saat ini: ${product.stock}, diminta: ${qty}`,
                });
            }

            // 5. Kurangi stok produk
            const updatedStock = product.stock - qty;
            const totalPrice = Number(product.price) * qty;

            await Product.update(product_id, { stock: updatedStock });

            // 6. Simpan transaksi (dengan rollback stok jika gagal)
            try {
                const transaction = await Transaction.create({
                    customer_id,
                    product_id,
                    quantity: qty,
                    total_price: totalPrice,
                });

                return res.status(201).json({
                    message: "Transaksi berhasil",
                    transaction,
                    remaining_stock: updatedStock,
                });
            } catch (txError) {
                // Rollback stok kembali ke awal jika pencatatan transaksi gagal
                await Product.update(product_id, { stock: product.stock });
                throw txError;
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getAll(req, res) {
        try {
            const transactions = await Transaction.getAll();
            res.json(transactions);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getById(req, res) {
        try {
            const transaction = await Transaction.getById(req.params.id);
            res.json(transaction);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    },
};

