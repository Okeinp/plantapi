import express from "express";
import dotenv from "dotenv";
import routerAPI from "./routes/index.js";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URI;
const app = express()
app.use(express.json());

app.get('/', (req,res) =>{
    res.status(200).send("PlantApi")
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