import express from "express";
import dotenv from "dotenv";
import routerAPI from "./routes/index.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


dotenv.config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const app = express()
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'resources')));

app.get('/', (req,res) =>{
    res.status(200).sendFile(path.join(__dirname, 'resources', 'views', 'index.html'));
})

routerAPI(app);

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Conectado a MongoDB Atlas");
        app.listen(port, () => {
            console.log(`Servidor en el ${port}`);
        });
    })
    .catch(err => {
        console.error("Error al conectar a MongoDB Atlas:", err);
    });