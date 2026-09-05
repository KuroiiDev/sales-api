import { supabase } from "../config/supabaseClient.js";

export const Transaction = {
    async create(payload) {
        const { data, error } = await supabase
            .from("transactions")
            .insert([payload])
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async getAll() {
        const { data, error } = await supabase
            .from("transactions")
            .select(
                `
                id, customer_id, product_id, quantity, total_price, created_at,
                customers ( id, name ),
                products ( id, name, price )
                `
            )
            .order("id", { ascending: false });
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const { data, error } = await supabase
            .from("transactions")
            .select(
                `
                id, customer_id, product_id, quantity, total_price, created_at,
                customers ( id, name ),
                products ( id, name, price )
                `
            )
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },
};

