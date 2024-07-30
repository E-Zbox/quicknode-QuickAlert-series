import { Router } from "express";
// controllers
import { webhookController } from "@/controllers/webhookController";

const routes = Router();

routes.post("", webhookController);

export default routes;
