import { Server, Socket } from "socket.io";
// listeners
import notificationListener from "@/listeners/notificationListener";

export default (io: Server<any>) => {
  io.on("connection", (socket: Socket) => {
    // once user is ...
    notificationListener(socket, io);
  });
};
