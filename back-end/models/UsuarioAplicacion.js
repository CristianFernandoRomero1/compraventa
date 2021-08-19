import mongoose from "mongoose";
const UsuarioAplicacionSchema = new mongoose.Schema({
    nombre: { type: String, unique: true },
    correo: { type: String,  unique: true },
    contrasena: { type: String, unique: true },
    telefono: { type: Number},
    numeroDocumentoIdentidad: { type: Number},
    idLicenciaConduccion: { type: Number},
    soat: { type: Number},
    modeloVehiculo: { type: String, unique: true },
    placaVehiculo: { type: String, unique: true },
    colorVehiculo: { type: String, unique: true },
    createAt: { type: Date, default: Date.now }
})
export default mongoose.model('UsuarioAplicacion', UsuarioAplicacionSchema);

// TABLAS => collection
// CAMPOS => property
// REGISTROS => Docments