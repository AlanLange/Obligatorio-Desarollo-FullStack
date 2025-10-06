import { crearCategoriaService, obtenerCategoriaService } from "../services/categoria.services.js";


export const crearCategoria = async (req, res) => {
    const categoriaData = req.body;
    try{
        const categoria = await crearCategoriaService(categoriaData);
        if(!categoria) return res.status(400).json({message: 'Error al crear la categoria'});
        res.status(201).json({message: 'Categoria creada exitosamente', categoria });
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

export const obtenerCategorias = async (req, res) => {
    try{
        const categorias = await obtenerCategoriaService();
        res.status(200).json({ categorias });
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}