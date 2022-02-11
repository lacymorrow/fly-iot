import { DeviceType } from './device.types';

export interface EventType {
  timeCreated: string;
  deviceId: string;
  name: string;
  start: string;
  stop?: string;
  port: string;
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
}

export interface ScheduleProps {
  deviceEvents: DeviceEventsType[];
}
