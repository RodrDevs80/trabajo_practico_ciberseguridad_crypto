import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import critografiaRoutes from "./src/routes/criptografia.routes.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// app.use(cors({
//     origin: ['http://localhost:5173'], // o tu dominio frontend
//     credentials: true
// }));

app.use(cors());
app.use(morgan('dev'));

//ruta de salud
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});


app.use(process.env.API_RAIZ, critografiaRoutes);

app.listen(PORT, () => {
    console.log(`app corriendo en http://localhost:${PORT} ✅`)
})