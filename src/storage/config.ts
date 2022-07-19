import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/storage/uploads');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}${Math.round(Math.random() * 1e9)}-${file.originalname}`
    );
  }
});

const upload = multer({ storage });

export { upload };
