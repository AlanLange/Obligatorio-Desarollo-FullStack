import { crearCategoriaService, obtenerCategoriaService } from "../services/categoria.services.js";


export const crearCategoria = async (req, res) => {
    const categoriaData = req.body;
    try{
        const categoria = await crearCategoriaService(categoriaData);
        if(!categoria) return res.status(400).json({message: 'Error al crear la categoria'});
        res.status(201).json({message: 'Categoria creada exitosamente', categoria });
    }catch(error){
        if (error.status && error.status !== 500) {
        return res.status(error.status).json({
          message: error.message,
        });
      }
        next(error);
    }
}

export const obtenerCategorias = async (req, res) => {
    const clienteId = req.id; 
    try{
        const categorias = await obtenerCategoriaService(clienteId);
        res.status(200).json({ categorias });
    }catch(error){
        if (error.status && error.status !== 500) {
            return res.status(error.status).json({
            message: error.message,
            });
        }
        next(error);
    }
}