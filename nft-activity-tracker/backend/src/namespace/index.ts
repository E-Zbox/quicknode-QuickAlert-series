import { Server as HTTPServer, IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
// middlewares
// namespaces

export const socketHandshakePath = "/api/socket.io";
export const baseSocketURL = `${socketHandshakePath}/v1`;

export const instantiateNamespacesIO = (
  httpServer: HTTPServer<typeof IncomingMessage, typeof ServerResponse>
) => {
  const io = new Server(httpServer, { path: socketHandshakePath });

  // io.use(middlewares)
};
