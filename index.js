const express = require('express');
const app = express();
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');

app.use(express.json());

const clientRoutes = require('./routes/clientRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/clients', clientRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});
