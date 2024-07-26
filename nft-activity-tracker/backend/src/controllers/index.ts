import { NextFunction, Request, Response } from "express";
// app
import { io } from "@/app";
// event listeners
import { emitEvents, onEvents } from "@/listeners";

export const webhookController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const matchedTransactions = req.body;
  console.log("json body");
  console.log(JSON.stringify(matchedTransactions));
  console.log("------- json body ---------");

  const { send_test_success } = emitEvents;

  const { send_test } = onEvents;

  const addressForClientToListen = [];

  // if (typeof matchedTransactions ===)

  io.emit("streams_timestamp", new Date().toDateString());

  io.on("connection", (socket) => {
    console.log(socket);

    socket.on(send_test, (payload) => {
      socket.emit(send_test_success, {
        message: "connected to socket",
        success: true,
      });
    });

    io.emit("got_some_data", { message: "hey there" });
  });

  return res.status(200).json({ data: null, error: "", success: true });
};
