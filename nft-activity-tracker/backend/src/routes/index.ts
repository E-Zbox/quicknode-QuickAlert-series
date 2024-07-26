import { Router } from "express";
// controllers
import { webhookController } from "@/controllers";

const routes = Router();

routes.post("/webhook", webhookController);

export const baseURL = "/api/v1";

export default routes;
