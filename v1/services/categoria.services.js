import Categoria from "../models/categoria.model.js";

export const crearCategoriaService = async (data) => {

    const categoria = new Categoria(data);
    await categoria.save();
    return categoria;

}

export const obtenerCategoriaService = async () => {
    const categorias = await Categoria.find();
    return categorias;
}