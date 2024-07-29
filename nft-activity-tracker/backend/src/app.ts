import * as bodyParse from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import {
  createServer,
  Server as HTTPServer,
  IncomingMessage,
  ServerResponse,
} from "http";
import { Server } from "socket.io";
// event listeners
import { emitEvents, onEvents } from "./listeners";

export const socketHandshakePath = "/socket.io/v1";

class App {
  public app: Application;
  public httpServer: HTTPServer<typeof IncomingMessage, typeof ServerResponse>;
  public io: Server;

  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: "*",
      },
      path: socketHandshakePath,
    });
    this.config();
    this.socket();
  }

  private config(): void {
    this.app.use(bodyParse.urlencoded({ extended: false }));
    this.app.use(express.json({ limit: "1mb" }));
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }

  private socket(): void {
    const { connection_success, send_test_success } = emitEvents;

    const { send_test } = onEvents;

    this.io.on("connection", (socket) => {
      socket.emit(connection_success, { message: "connected 🎉🎉🎉!" });

      socket.on(send_test, (payload) => {
        socket.emit(send_test_success, {
          message: "connected to socket",
          success: true,
        });
      });
    });
  }
}

export const expressApp = new App();

export const app = expressApp.app;

export const httpServer = expressApp.httpServer;

export const io = expressApp.io;
