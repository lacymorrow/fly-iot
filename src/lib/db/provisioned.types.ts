export interface EventType {
  timeCreated: string;
  deviceId: string;
  start: string;
  stop?: string;
  port: string;
}

export interface ProvisionDeviceProps {
  deviceId?: string;
  ports?: number;
}
export interface RegisterProvisionedDeviceProps {
  deviceId: string;
  userId: string;
}
