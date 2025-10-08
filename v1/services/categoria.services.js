import Barberia from "../models/barberia.model.js";
import Categoria from "../models/categoria.model.js";


export const crearCategoriaService = async (data, clienteId) => {

    const barberia = await Barberia.findOne({ clienteId: clienteId })
        .populate('categorias');
    
    if (!barberia) {
        const err = new Error("Barbería no encontrada para este cliente");
        err.status = 404;
        throw err;
    }

    const categoriaExistente = barberia.categorias.find(cat => 
        cat.nombre.toLowerCase() === data.nombre.toLowerCase()
    );

    if (categoriaExistente) {
        const err = new Error("Ya existe una categoría con este nombre en tu barbería");
        err.status = 409;
        throw err;
    }

    const nuevaCategoria = new Categoria({
        nombre: data.nombre
    });
    
    await nuevaCategoria.save();
    
    barberia.categorias.push(nuevaCategoria._id);
    await barberia.save();
    
    return nuevaCategoria;
}

export const obtenerCategoriaService = async (clienteId) => {

    const barberia = await Barberia.findOne({ clienteId: clienteId })
        .populate('categorias');
    
    if (!barberia) {
        const err = new Error("Barbería no encontrada para este cliente");
        err.status = 404;
        throw err;
    }

    if (!barberia.categorias || barberia.categorias.length === 0) {
        const err = new Error("No se encontraron categorías para esta barbería");
        err.status = 404;
        throw err;
    }

    return barberia.categorias;
}