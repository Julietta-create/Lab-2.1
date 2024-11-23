const sql = require('mssql/msnodesqlv8');
require('dotenv').config();

const config = {
    connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=${process.env.DB_SERVER || 'localhost'};Database=${process.env.DB_DATABASE || 'YourDatabaseName'};Trusted_Connection=yes;`,
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Підключення до бази даних успішне');
        return pool;
    })
    .catch(err => console.log('Помилка підключення до бази даних: ', err));

module.exports = {
    sql, poolPromise
};
