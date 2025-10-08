import Categoria from "../models/categoria.model.js";

export const crearCategoriaService = async (data, clienteId) => {

    const categoriaExistente = await Categoria.findOne({ nombre: data.nombre.trim(), cliente: clienteId });
    if(categoriaExistente){
        throw new Error('La categoria ya existe en este usuario');
    }
    else{
        const categoria = new Categoria(data);
        await categoria.save();
        return categoria;
    }
}

export const obtenerCategoriaService = async (clienteId) => {

    const categorias = await Categoria.find({ cliente: clienteId });
    if(!categorias || categorias.length === 0){
        throw new Error('No se encontraron categorias para este usuario');
    }
    
    return categorias;
}