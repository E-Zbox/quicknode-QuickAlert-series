export interface IDestination {
  id: string;
  name: string;
  to: string;
  webhook_type: string;
  service: string;
  payload_type: number;
}

export interface INotification {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  expression: string;
  network: string;
  destinations: IDestination[];
  enabled: boolean;
}

export interface IUpdateNotificationPayload {
  expression: string;
}

interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}

export interface IGetNotificationResponse
  extends IGenericResponse<INotification> {}

export interface IUpdateNotificationResponse
  extends IGenericResponse<INotification> {}
