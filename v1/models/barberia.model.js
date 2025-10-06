import mongoose from "mongoose";
import Cliente from "./cliente.model.js";
const barberiaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    clienteId : { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true, unique: true },
    direccion: { type: String, required: true },
    telefono: { type: String, required: true },
    servicios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Servicio' }]
});

const Barberia = mongoose.model("Barberia", barberiaSchema);
export default Barberia;
