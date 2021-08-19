import historialRuta from '../models/historialRuta.js'


const historialRutaNuevaRuta = async (req, res) => {
    const {
        lugarOrigen,
        lugarDestino,
        dineroPagado,
        idPasajero
    } = req.body;
    const historial = historialRuta({
        lugarOrigen,
        lugarDestino,
        dineroPagado,
        idPasajero
    })
    console.log(historial)
    historial.save();
    console.log(historial);
    return res.status(200).json({
        historial
    });
}

const historialRutaListadoPasajeros = async (req, res) => {
  
    const historial = await historialRuta.find({estadoViaje : {$in:[0]}}).populate("idPasajero",["nombre", "correo"]);
            console.log(historial);
    return res.status(200).json({
                historial
            });

}

    const aceptarViajeidConductor = async (req, res) => {
 const {historialId, idConductor} = req.body;
            const historialListo = await historialRuta.findByIdAndUpdate(historialId, {
                estadoViaje: 1,
                idConductor: idConductor
            }); 

            return res.status(200).json({
                historialListo
            })
    }





const historialRutaBuscarConductor = async (req, res) => {
    const {
        id
    } = req.params;
    console.log(id);
    const historial = await historialRuta.find({
        $and: [{
            _id: {
                $in: [id]
            }
        }, {
            estadoViaje: {
                $in: ["1"]
            }
        }]
    })
    .populate('idConductor',["nombre","telefono"]);
    console.log(historial);
    return res.status(200).json({
        historial
    });
}

const historialRutaBuscarPasajero = async (req, res) => {
    const {historialId} = req.body;
    const historial = await historialRuta.findById(historialId).populate("idPasajero",["nombre", "correo"]);
            console.log("imprimirendo historial refrescar pasajero" + historial);
    return res.status(200).json({
                historial
            });

}
//hjoajo
const historialRutaPasajeroFeedback = async (req, res) => {
    const {
        feedbackCliente,
        idHistorialRuta
    } = req.body;
    console.log(req.body);
    const historial = await historialRuta.findByIdAndUpdate(idHistorialRuta, {
        feedbackCliente
    })
    res.json({
        historial
    });
}

const historialRutaConductorFeedback = async (req, res) => {
    const {
        feedbackConductor,
        idHistorialRuta
    } = req.body;
    console.log(req.body);

    const historial = await historialRuta.findByIdAndUpdate(idHistorialRuta, {
        feedbackConductor
    })
    res.json({
        historial
    });
}

export {
    historialRutaNuevaRuta,
    historialRutaListadoPasajeros,
    historialRutaBuscarPasajero,
    historialRutaBuscarConductor,
    historialRutaPasajeroFeedback,
    historialRutaConductorFeedback,
    aceptarViajeidConductor
};