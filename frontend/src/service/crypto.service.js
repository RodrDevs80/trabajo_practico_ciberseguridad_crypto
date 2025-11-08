import axios from "axios";

//servicios
const generarClaveService = async () => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/v1/generar-clave"
        );
        response.data;
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
};

const cifrarTextoService = async (texto, pass) => {
    const body = {
        texto: texto,
        keyBase64: pass,
    };
    try {
        const response = await axios.post(
            "http://localhost:3000/api/v1/encriptar",
            body
        );
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
};
const descifrarTextoService = async (texto, pass, iv, authTag) => {
    const body = {
        textoEncriptado: texto,
        iv,
        authTag,
        keyBase64: pass,
    };
    try {
        const response = await axios.post(
            "http://localhost:3000/api/v1/desencriptar",
            body
        );
        return response.data;
    } catch (err) {
        console.log(err.message);
    }
};

export { generarClaveService, cifrarTextoService, descifrarTextoService }