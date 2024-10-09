
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const auth = (req, res, next) => {
    const headersToken = req.headers.authorization;

    if (headersToken) {
        const token = headersToken.split(" ")[1];
        const secretKey = process.env.JWT_SECRET; 

        jwt.verify(token, secretKey, (err, payload) => {
            if (err) {
                console.error("Error al verificar el token:", err.message); 
                return res.status(401).json({ message: "Token inválido o expirado" });
            }
            console.log("Token verificado:", payload); 
            req.user = payload; 
            next();
        });
    } else {
        return res.status(401).json({ message: "No se proporcionó un token" });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};



const createUser = async (req, res) => {
    const { name, lastname, username, password, email } = req.body;

    try {
        
        const newUser = new userModel({
            name,
            lastname,
            username,
            password,  
            email
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error en el servidor", error });
    }
};


const loginUser = async (req, res) => {
    const { password, email } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        console.log(`Password valid: ${validPassword}`); 

        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
};


const getUsersById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};



const updateUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findByIdAndUpdate(userId, req.body, { new: true });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userModel.findByIdAndDelete(userId);

        if (user) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};

export { getAllUsers, getUsersById, createUser, loginUser, updateUser, deleteUser, auth };