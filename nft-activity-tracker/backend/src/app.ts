import * as bodyParse from "body-parser";
import express, { Application } from "express";
import {
  createServer,
  Server as HTTPServer,
  IncomingMessage,
  ServerResponse,
} from "http";
import { Server } from "socket.io";

export const socketHandshakePath = "/socket.io/v1";

class App {
  public app: Application;
  public httpServer: HTTPServer<typeof IncomingMessage, typeof ServerResponse>;
  public io: Server;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, { path: socketHandshakePath });
    this.config();
  }

  private config(): void {
    this.app.use(bodyParse.urlencoded({ extended: false }));
    this.app.use(express.json({ limit: "1mb" }));
  }
}

export const expressApp = new App();

export const app = expressApp.app;

export const httpServer = expressApp.httpServer;

export const io = expressApp.io;
