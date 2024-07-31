// interface
import {
  IGetNotificationExpression,
  IUpdateNotificationExpression,
} from "./interface";

const NEXT_PUBLIC_WEBHOOK_ENDPOINT = process.env.NEXT_PUBLIC_WEBHOOK_ENDPOINT;
// const NEXT_PUBLIC_WEBHOOK_ENDPOINT = "http://localhost:5000";

if (!NEXT_PUBLIC_WEBHOOK_ENDPOINT) {
  throw new Error(`Missing 'NEXT_PUBLIC_WEBHOOK_ENDPOINT' in environment`);
}

export const isAlive = async () => {
  const result = await fetch(`${NEXT_PUBLIC_WEBHOOK_ENDPOINT}/alive`);

  return await result.json();
};

export const getNotificationExpression =
  async (): Promise<IGetNotificationExpression> => {
    const result = await fetch(
      `${NEXT_PUBLIC_WEBHOOK_ENDPOINT}/api/v1/notification`,
      {
        method: "GET",
      }
    );

    return await result.json();
  };

export const updateNotificationExpression = async (
  _addressToListen: string
): Promise<IUpdateNotificationExpression> => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const result = await fetch(
    `${NEXT_PUBLIC_WEBHOOK_ENDPOINT}/api/v1/notification/update`,
    {
      headers,
      method: "PATCH",
      body: JSON.stringify({ _addressToListen }),
    }
  );

  return await result.json();
};

export const onEvents = {
  connection_success: "connection_success",
  streams_timestamp: "streams_timestamp",
  transaction_address: "transaction_address",
  transaction_success: "transaction_success",
  updated_watch_address: "updated_watch_address",
};
