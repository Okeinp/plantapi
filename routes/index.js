import express from 'express';
import plantasRouter from "./plantasRouter.js";
import cuidadosRouter from "./cuidadosRouter.js";
import userRouter from "./userRouter.js";

const routerAPI = (app) => {
    const router = express.Router();
    router.use('/plantas', plantasRouter);
    router.use('/cuidados', cuidadosRouter);
    router.use('/user', userRouter);
    app.use(router);
}

export default routerAPI;