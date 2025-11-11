import express from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
import { uploadImageMiddleware } from '../middlewares/upload.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateSesion } from '../middlewares/validateSesion.middleware.js';

const router = express.Router({ mergeParams: true });

// solo usuarios logueados pueden subir imágenes
router.post(
  '/',
  validateSesion,
  uploadImageMiddleware,
  uploadImage
);

export default router;
