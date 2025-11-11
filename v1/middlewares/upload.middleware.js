// src/middlewares/upload.middleware.js
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter(req, file, cb) {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Formato de imagen no permitido'));
    }
    cb(null, true);
  },
});

// 👇 ESTE es el middleware que tenés que usar en la ruta
export const uploadImageMiddleware = upload.single('image'); // el campo se llama "image"
