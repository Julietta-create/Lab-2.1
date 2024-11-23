const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Операції з клієнтами
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Отримати всіх клієнтів
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Список клієнтів
 */
router.get('/', clientController.getAllClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Отримати клієнта за ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID клієнта
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Інформація про клієнта
 *       404:
 *         description: Клієнт не знайдений
 */
router.get('/:id', clientController.getClientById);

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Створити нового клієнта
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Клієнт створений
 *       500:
 *         description: Помилка сервера
 */
router.post('/', clientController.createClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Оновити інформацію про клієнта
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID клієнта
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Клієнт оновлено
 *       404:
 *         description: Клієнт не знайдений
 *       500:
 *         description: Помилка сервера
 */
router.put('/:id', clientController.updateClient);

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Видалити клієнта
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID клієнта
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Клієнт видалено
 *       404:
 *         description: Клієнт не знайдений
 *       500:
 *         description: Помилка сервера
 */
router.delete('/:id', clientController.deleteClient);

module.exports = router;
