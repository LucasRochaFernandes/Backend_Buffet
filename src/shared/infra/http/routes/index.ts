import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { inventoryRoutes } from "./inventory.routes";
import { ordersRoutes } from "./orders.routes";
import { passwordRoutes } from "./password.routes";
import { userRoutes } from "./users.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/password", passwordRoutes);
routes.use("/inventory", inventoryRoutes);
routes.use("/order", ordersRoutes);
routes.use(authenticateRoutes);

export { routes };

