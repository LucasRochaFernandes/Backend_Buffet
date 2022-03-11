import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { passwordRoutes } from "./password.routes";
import { userRoutes } from "./users.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/password", passwordRoutes);
routes.use(authenticateRoutes);

export { routes };
