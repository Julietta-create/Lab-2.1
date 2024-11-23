const { poolPromise, sql } = require('../config/db');

const createRoom = async (req, res) => {
    try {
        const { status, number } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('status', sql.VarChar(50), status)
            .input('number', sql.VarChar(10), number)
            .query('INSERT INTO [Номер] (status, number) VALUES (@status, @number); SELECT SCOPE_IDENTITY() AS id;');
        res.status(201).json({ id: result.recordset[0].id, status, number });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [Номер]');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM [Номер] WHERE id = @id');
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Номер не знайдений' });
        }
        res.status(200).json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, number } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('status', sql.VarChar(50), status)
            .input('number', sql.VarChar(10), number)
            .query('UPDATE [Номер] SET status = @status, number = @number WHERE id = @id');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Номер не знайдений' });
        }
        res.status(200).json({ id, status, number });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM [Номер] WHERE id = @id');
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Номер не знайдений' });
        }
        res.status(200).json({ message: 'Номер успішно видалений' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
};
