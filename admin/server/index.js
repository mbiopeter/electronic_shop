const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const logger = require('./config/logger'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Use body-parser middleware
app.use(express.json());
// Log each request
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Define routes
app.use('/api/users', userRoutes);

// Test DB connection and start server
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
