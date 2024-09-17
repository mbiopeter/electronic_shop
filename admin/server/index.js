// index.js
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const logger = require('./config/logger'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes);
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Test DB connection and start server
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
