const { poolPromise, sql } = require('../config/db');

const getTotalPayments = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; 
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Потрібні початкова та кінцева дати' });
        }
        const pool = await poolPromise;
        const result = await pool.request()
            .input('startDate', sql.Date, startDate)
            .input('endDate', sql.Date, endDate)
            .query(`
                SELECT SUM(amount) AS totalPayments
                FROM [Оплата]
                WHERE date BETWEEN @startDate AND @endDate
            `);
        res.status(200).json({ totalPayments: result.recordset[0].totalPayments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getTotalPayments
};
