import crypto from "crypto"
import { generarClaveAleatoriaApiCrypto } from "../../util/generarClave.js";

const generarClave = (req, res) => {
    const secretKey = generarClaveAleatoriaApiCrypto();
    console.log(secretKey.toString("base64"))
    res.status(201).json({
        success: true,
        message: 'Key creada de manera exitosa ✅',
        keyBase64: secretKey.toString('base64'),
        longitud: secretKey.length,
    });
}


const cifrarTexto = (req, res) => {
    const { texto, keyBase64 } = req.body;
    //verificar que estén todos los campos
    if (!texto || !keyBase64) {
        return res.status(404).json({ msg: "Los campos texto y keyBase64 son obligatorios" })
    }
    try {
        //pasar de base64 a un formato que lo pueda usar crypto
        const key = Buffer.from(keyBase64, 'base64')

        // Verificar que la clave exista y tenga 32 bytes
        if (!key && key.length !== 32) {
            return res.status(404).json({
                msg: 'El key es obligatorio y debe tener 32 bytes'
            })
        }

        // Generar IV aleatorio
        const iv = crypto.randomBytes(16);

        // Crear cipher
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv, {
            authTagLength: 16
        });

        // Encriptar
        let encrypted = cipher.update(texto, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Obtener tag de autenticación
        const authTag = cipher.getAuthTag();

        return res.status(200).json({
            encrypted: encrypted,
            iv: iv.toString('hex'),
            authTag: authTag.toString('hex')
        });

    } catch (error) {
        res.status(500).json({ msg: `Error en encriptación: ${error.message}` });
    }

}



const descifrarTexto = (req, res) => {
    const { textoEncriptado, iv, authTag, keyBase64 } = req.body;
    //verificar que estén todos los campos
    if (!textoEncriptado || !iv || !authTag || !keyBase64) {
        return res.status(404).json({ msg: "Los campos textoEncriptado, iv, authTag,  keyBase64 son obligatorios" })
    }

    try {

        //pasar de base64 a un formato que lo pueda usar crypto
        const key = Buffer.from(keyBase64, 'base64')

        // Verificar que la clave exista y tenga 32 bytes
        if (!key && key.length !== 32) {
            return res.status(404).json({
                msg: 'El key es obligatorio y debe tener 32 bytes'
            })
        }

        const ivBuffer = Buffer.from(iv, 'hex');
        const authTagBuffer = Buffer.from(authTag, 'hex');

        // Crear decipher
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, ivBuffer);

        // Establecer tag de autenticación
        decipher.setAuthTag(authTagBuffer);

        // Desencriptar
        let decrypted = decipher.update(textoEncriptado, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return res.status(200).json({ textoDesencriptado: decrypted });

    } catch (error) {
        res.status(500).json({ msg: `Error en encriptación: ${error.message}` });
    }
}


export { generarClave, cifrarTexto, descifrarTexto }