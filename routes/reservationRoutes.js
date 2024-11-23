const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');


/**
 * @swagger
 * /api/reservations/details:
 *   get:
 *     summary: Отримати всі бронювання з інформацією про клієнтів та номери
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Список бронювань з деталями
 *       500:
 *         description: Помилка сервера
 */
router.get('/details', reservationController.getAllReservationsWithDetails);




/**
 * @swagger
 * /api/reservations/filter:
 *   get:
 *     summary: Отримати бронювання за датою
 *     tags: [Reservations]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         description: Дата бронювання (формат YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Список бронювань за вказаною датою
 *       400:
 *         description: Невірний запит
 *       500:
 *         description: Помилка сервера
 */
router.get('/filter', reservationController.getReservationsByDate);

module.exports = router;
