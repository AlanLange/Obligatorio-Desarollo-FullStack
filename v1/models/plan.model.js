import mongoose from "mongoose";
const planSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true },
    precio: { type: Number, required: true },
    descripcion: { type: String },
    limiteAgenda: { type: Number, required: true },
});
const Plan = mongoose.model("Plan", planSchema);
export default Plan;