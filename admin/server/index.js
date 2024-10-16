const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const brandRoutes = require('./routes/brandsRoutes');
const variantTypeRoutes = require('./routes/variantTypeRoutes');
const variantRoutes = require('./routes/variantRoutes');
const couponRoutes = require('./routes/couponRoutes');
const posterRoutes = require('./routes/posterRoutes');
const logger = require('./config/logger'); 
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

// Use body-parser middleware
app.use(express.json());
// Log each request
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/', express.static('images'));
// api routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subCategories', subCategoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/variantType', variantTypeRoutes);
app.use('/api/variant', variantRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/poster', posterRoutes);

// Test DB connection and start server
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
