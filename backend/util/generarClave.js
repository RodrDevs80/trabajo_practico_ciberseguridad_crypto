import caracteres from "./caracteres.js";
import crypto from "crypto";


export const generarClaveAleatoriaMio = (longitud) => {
    let secretKey = "";

    for (let i = 0; i < longitud; i++) {
        secretKey += caracteres[Number(Math.random() * caracteres.length).toFixed()]
    }

    return secretKey;
}

export const generarClaveAleatoriaApiCrypto = () => {
    // Generar clave AES de 32 bytes (256 bits)
    const key = crypto.randomBytes(32);
    return key;
}