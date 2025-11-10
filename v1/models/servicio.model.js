import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    duracion: { type: Number, required: true }, // Duracion en minutos
    precio: { type: Number, required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
    descripcion: { type: String },
     createdAt: { type: Date, required: true },
     urlImage: { type: String , default: 'https://i.pinimg.com/736x/90/c5/85/90c58554fad3dd2ca1c3d5c32adb5ba3.jpg'},
});

const Servicio = mongoose.model("Servicio", servicioSchema);
export default Servicio;
