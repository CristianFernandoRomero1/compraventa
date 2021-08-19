import { Router } from "express"
import {  UsuarioAplicacionGet, UsuarioAplicacionPost } from "../controllers/UsuarioAplicacion.js";

const router = Router();
router.get('/', UsuarioAplicacionGet);
router.post('/', UsuarioAplicacionPost);
/* router.put('/:id', articuloUpdate);
router.delete('/:id', articuloDelete); */
export default router;