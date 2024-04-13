const multer = require('multer');
const logger = require('../logger/logger');
const { LOG_TYPE } = require('../../enum/logType');
const { STATUS_CODE } = require('../../enum/statusCode');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/images');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        callback(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
    },
});

const UploadImage = (req, res, next) => {
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, callback) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                callback(null, true);
            } else {
                callback(new Error(`Only .jpeg and .png formats are allowed`));
            }
        }
    }).single('image');

    upload(req, res, (error) => {
        if (error) {
            const errorMessage = error.message ? error.message : 'File upload failed';

            res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                error: errorMessage,
            });

            logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, errorMessage, req);
        } else {
            next();
        }
    });
};

module.exports = UploadImage;
