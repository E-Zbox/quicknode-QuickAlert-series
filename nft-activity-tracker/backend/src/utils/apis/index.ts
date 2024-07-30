// errors
import { MissingEnvError } from "../errors/api";
// interface
import {
  IGetNotificationResponse,
  IUpdateNotificationPayload,
  IUpdateNotificationResponse,
} from "./interface";

const { QUICKNODE_API_KEY, QUICKNODE_NOTIFICATION_ENDPOINT } = process.env;

export const getNotification = async (): Promise<IGetNotificationResponse> => {
  let response: IGetNotificationResponse = {
    data: {
      created_at: "",
      destinations: [],
      enabled: true,
      expression: "",
      id: "",
      name: "",
      network: "",
      updated_at: "",
    },
    error: "",
    success: false,
  };

  try {
    if (!QUICKNODE_API_KEY || !QUICKNODE_NOTIFICATION_ENDPOINT) {
      throw new MissingEnvError();
    }

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("X-API-Key", QUICKNODE_API_KEY);

    const result = await fetch(QUICKNODE_NOTIFICATION_ENDPOINT, {
      method: "GET",
      headers,
      redirect: "follow",
    });

    const [data] = await result.json();

    response = {
      data,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const updateNotification = async (
  notificationId: string,
  updatePayload: IUpdateNotificationPayload
): Promise<IUpdateNotificationResponse> => {
  let response: IUpdateNotificationResponse = {
    data: {
      created_at: "",
      destinations: [],
      enabled: true,
      expression: "",
      id: "",
      name: "",
      network: "",
      updated_at: "",
    },
    error: "",
    success: false,
  };

  try {
    if (!QUICKNODE_API_KEY || !QUICKNODE_NOTIFICATION_ENDPOINT) {
      throw new MissingEnvError();
    }

    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("X-API-Key", QUICKNODE_API_KEY);

    fetch(`${QUICKNODE_NOTIFICATION_ENDPOINT}/${notificationId}`, {
      method: "PATCH",
      headers,
      redirect: "follow",
      body: JSON.stringify(updatePayload),
    });
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};
