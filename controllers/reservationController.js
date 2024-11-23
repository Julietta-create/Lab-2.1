
const { poolPromise, sql } = require('../config/db');
const getReservationsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ message: 'Дата обов’язкова' });
        }
        const pool = await poolPromise;
        const result = await pool.request()
            .input('reservation_date', sql.Date, date)
            .query('SELECT * FROM [Бронювання] WHERE reservation_date = @reservation_date');
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllReservationsWithDetails = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                Бронювання.reservation_id,
                Бронювання.reservation_date,
                Клієнт.id AS guest_id,
                Клієнт.name AS guest_name,
                Клієнт.phone AS guest_phone,
                Номер.id AS room_id,
                Номер.number AS room_number,
                Номер.status AS room_status
            FROM [Бронювання]
            JOIN [Клієнт] ON [Бронювання].guest_id = [Клієнт].id
            JOIN [Номер] ON [Бронювання].room_id = [Номер].id
        `);
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllReservationsWithDetails,
    getReservationsByDate
};