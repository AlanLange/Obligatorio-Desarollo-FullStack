import Categoria from "../models/categoria.model.js";

export const crearCategoriaService = async (data, clienteId) => {

    const categoriaExistente = await Categoria.findOne({ nombre: data.nombre.trim(), cliente: clienteId });
    if(categoriaExistente){
        const err = new Error("La categoria ya existe en este usuario");
        err.status = 404;
        throw err;
    }
    else{
        const categoria = new Categoria(data);
        categoria.cliente = clienteId;
        await categoria.save();
        return categoria;
    }
}

export const obtenerCategoriaService = async (clienteId) => {

    const categorias = await Categoria.find({ cliente: clienteId });
    if(!categorias || categorias.length === 0){
        const err = new Error("No se encontraron categorias para este usuario");
        err.status = 404;
        throw err;
    }

    return categorias;
}