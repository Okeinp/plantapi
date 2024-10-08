import plantasRouter from "./plantasRouter.js";
import cuidadosRouter from "./cuidadosRouter.js";
import userRouter from "./userRouter.js";

const routerAPI = ( app) => {
    app.use('/plantas', plantasRouter);
    app.use('/cuidados', cuidadosRouter);
    app.use('/user', userRouter);
}

export default routerAPI;