import { Router } from "express";
import { generarClave, cifrarTexto, descifrarTexto } from "../controllers/criptografia.controller.js";



const critografiaRoutes = Router();

critografiaRoutes.post("/generar-clave", generarClave)

critografiaRoutes.post("/encriptar", cifrarTexto)

critografiaRoutes.post("/desencriptar", descifrarTexto)

export default critografiaRoutes;