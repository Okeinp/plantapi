import plantasRouter from "./plantasRouter.js";
import cuidadosRouter from "./cuidadosRouter.js";

const routerAPI = ( app) => {
    app.use('/plantas', plantasRouter);
    app.use('/cuidados', cuidadosRouter);
}

export default routerAPI;