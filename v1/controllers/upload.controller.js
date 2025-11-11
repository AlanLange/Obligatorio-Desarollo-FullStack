// src/controllers/upload.controller.js
import { uploadImageToCloudinary } from '../services/uploadImage.service.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'La imagen es obligatoria' });
    }

    const result = await uploadImageToCloudinary(req.file.buffer);

    return res.status(201).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary', error);
    next(error);
  }
};
