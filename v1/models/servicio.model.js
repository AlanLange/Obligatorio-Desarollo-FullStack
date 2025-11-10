import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    duracion: { type: Number, required: true }, // Duracion en minutos
    precio: { type: Number, required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
    descripcion: { type: String },
     createdAt: { type: Date, required: true },
     urlImage: { type: String , default: '/img/default-image.jpg'},
});

const Servicio = mongoose.model("Servicio", servicioSchema);
export default Servicio;
