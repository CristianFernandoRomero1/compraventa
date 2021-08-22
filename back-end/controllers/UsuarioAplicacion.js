import UsuarioAplicacion from '../models/usuario.js'

const UsuarioAplicacionGet = async(req, res) => {
    //const articulos = await Articulo.find().populate('categoria', 'nombre');
    const usuarioAplicacion = await UsuarioAplicacion.find();
    res.json({
        usuarioAplicacion
    })
}
const UsuarioAplicacionPost = async(req, res) => {
    const { nombre, correo, contrasena, telefono, numeroDocumentoIdentidad, idLicenciaConduccion, soat, modeloVehiculo, placaVehiculo, colorVehiculo } = req.body;
    const usuarioAplicacion = new UsuarioAplicacion({nombre, correo, contrasena, telefono, numeroDocumentoIdentidad, idLicenciaConduccion, soat, modeloVehiculo, placaVehiculo, colorVehiculo})
    await usuarioAplicacion.save();
    res.json({
        usuarioAplicacion
    })
}
/*const articuloUpdate = async(req,res)=>{
   const {id}=req.params;
   const {_id,createAt,__v,...resto}=req.body;
   const articulo=await Articulo.findByIdAndUpdate(id, resto);
   console.log(req.body);
   console.log("Intento de actualizar Articulos");
   res.json({articulo})
}
const articuloDelete = async(req,res)=>{
   const {id} = req.params;
   const articulo = await Articulo.findByIdAndDelete(id);
   console.log("dentro de delete")
   console.log(id)
   res.json({articulo})
}*/

export { UsuarioAplicacionGet, UsuarioAplicacionPost};