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

  const { connection_success, send_test_success, updated_watch_address } =
    emitEvents;

  const { send_test } = onEvents;

  const addressForClientToListen: any[] = [];

  if (!Array.isArray(matchedTransactions)) {
    return res.status(200).json({
      message:
        "`req.body` is not an array. Check QuickNode notification emitter.",
      error: "",
      success: true,
    });
  }

  matchedTransactions.forEach((tx) => {
    const { from, to } = tx;

    if (from !== to) {
      addressForClientToListen.push(to.toLowerCase());
    }

    addressForClientToListen.push(from.toLowerCase());
  });

  if (addressForClientToListen.length > 0) {
    io.emit(updated_watch_address, {
      data: addressForClientToListen,
      error: "",
      success: true,
    });
  }

  io.emit("streams_timestamp", new Date().toISOString());

  io.on("connection", (socket) => {
    socket.on(send_test, (payload) => {
      socket.emit(send_test_success, {
        message: "connected to socket",
        success: true,
      });
    });

    io.emit(connection_success, { message: "connected" });
  });

  return res.status(200).json({ data: null, error: "", success: true });
};
