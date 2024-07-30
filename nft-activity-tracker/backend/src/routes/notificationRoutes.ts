import { Router } from "express";
// controllers
import {
  getNotificationExpressController,
  updateNotificationExpressionController,
} from "@/controllers/notificationController";

const routes = Router();

routes.get("/", getNotificationExpressController);
routes.patch("/update", updateNotificationExpressionController);

export default routes;
