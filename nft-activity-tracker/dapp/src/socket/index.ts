import { io } from "socket.io-client";

const NEXT_PUBLIC_SOCKET_ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_ENDPOINT;
// const NEXT_PUBLIC_SOCKET_ENDPOINT = "http://localhost:5000";

if (!NEXT_PUBLIC_SOCKET_ENDPOINT) {
  throw new Error(`Missing 'NEXT_PUBLIC_SOCKET_ENDPOINT' in environment`);
}

export const isAlive = async () => {
  const result = await fetch(`${NEXT_PUBLIC_SOCKET_ENDPOINT}/alive`);

  return await result.json();
};

export const onEvents = {
  connection_success: "connection_success",
  streams_timestamp: "streams_timestamp",
  transaction_success: "transaction_success",
  updated_watch_address: "updated_watch_address",
};
