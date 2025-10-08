import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true,  },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: false }
});
const Categoria = mongoose.model("Categoria", categoriaSchema);
export default Categoria;   