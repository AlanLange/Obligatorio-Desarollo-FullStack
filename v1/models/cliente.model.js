import mongoose from "mongoose";
const clienteSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    plan: {type:String,enum:["Plus","Premium"],default:"Plus",required:false}
});

const Cliente = mongoose.model("Cliente", clienteSchema);
export default Cliente;
