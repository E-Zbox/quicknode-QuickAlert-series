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
    this.io.on("connection", (socket) => {
      socket.emit("connection_success", { message: "connected 🎉🎉🎉!" });
    });
  }
}

export const expressApp = new App();

export const app = expressApp.app;

export const httpServer = expressApp.httpServer;

export const io = expressApp.io;

const _ = {
  accessList: [],
  blockHash:
    "0x7d6102f2780f7b04059a7573bb100a3a481f26fa9dac5b651f3e02e5553394ab",
  blockNumber: "0x1372524",
  chainId: "0x1",
  from: "0xb23360ccdd9ed1b15d45e5d3824bb409c8d7c460",
  gas: "0x19058",
  gasPrice: "0x2540be400",
  hash: "0x2c036850025cb4e0e92b389a6ad68fa98529fe68769095c17c2bdd774f1a3388",
  input:
    "0xa9059cbb000000000000000000000000e28a8acd865d105f9847b69702d7b150872f40b40000000000000000000000000000000000000000000000000000000c958a2c17",
  maxFeePerGas: "0x2540be400",
  maxPriorityFeePerGas: "0x2540be400",
  nonce: "0x10813a",
  r: "0x9f793bc84b832b8caf7c7ac4c9171cf986dda51273ef1e77081b44e100cfac08",
  s: "0x2d0eadb333b9ad95fdebca7de350fa17375f426f16dcaba976dc9bb281ebfdea",
  to: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  transactionIndex: "0x20",
  type: "0x2",
  v: "0x0",
  value: "0x0",
};
