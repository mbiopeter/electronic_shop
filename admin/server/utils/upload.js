const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'images';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Define file filter to only allow image files
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

// Set up multer with the defined storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit to 5MB per file
        files: 5 // Limit to 5 files
    }
});

module.exports = upload;
