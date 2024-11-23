// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Інші CRUD-операції тут

/**
 * @swagger
 * /api/payments/total:
 *   get:
 *     summary: Отримати загальну суму оплат за період
 *     tags: [Payments]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         description: Початкова дата (формат YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         required: true
 *         description: Кінцева дата (формат YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Загальна сума оплат
 *       400:
 *         description: Невірний запит
 *       500:
 *         description: Помилка сервера
 */
router.get('/total', paymentController.getTotalPayments);

module.exports = router;
