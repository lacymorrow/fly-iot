import { DeviceType } from './device.types';

export interface EventType {
  timeCreated: number;
  deviceId: string;
  name: string;
  start: string;
  stop?: string;
  port: number;
}

export interface DeviceEventsType {
  device: DeviceType;
  events: EventType[];
}

export interface AddEventProps {
  deviceId: string;
  name: string;
  start: string;
  stop?: string;
  port?: number;
}

export interface ScheduleProps {
  deviceEvents: DeviceEventsType[];
}
