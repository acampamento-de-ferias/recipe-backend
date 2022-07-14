import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, './src/storage/uploads');
    },
    filename: function (req, file, cb) {
       cb(null, `${Date.now()}${Math.round(Math.random() * 1E9)}-${file.originalname}`);
    }
 });

const upload = multer({ storage });

export { upload };