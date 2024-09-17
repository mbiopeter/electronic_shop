// /utils/errorHandler.js
const handleError = (res, error) => {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
};

module.exports = handleError;
    