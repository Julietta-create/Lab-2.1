
const { poolPromise, sql } = require('../config/db');


const createClient = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('name', sql.VarChar(255), name)
            .input('phone', sql.VarChar(15), phone)
            .query('INSERT INTO [Клієнт] (name, phone) VALUES (@name, @phone); SELECT SCOPE_IDENTITY() AS id;');
        res.status(201).json({ id: result.recordset[0].id, name, phone });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllClients = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [Клієнт]');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM [Клієнт] WHERE id = @id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Клієнт не знайдений' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar(255), name)
            .input('phone', sql.VarChar(15), phone)
            .query('UPDATE [Клієнт] SET name = @name, phone = @phone WHERE id = @id');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Клієнт не знайдений' });
        }
        res.status(200).json({ id, name, phone });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM [Клієнт] WHERE id = @id');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Клієнт не знайдений' });
        }
        res.status(200).json({ message: 'Клієнт успішно видалений' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
};
