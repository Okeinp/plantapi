import plantasRouter from "./plantasRouter.js";

const routerAPI = ( app) => {
    app.use('/plantas', plantasRouter);
}

export default routerAPI;