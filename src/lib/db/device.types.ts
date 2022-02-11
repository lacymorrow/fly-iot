export interface DeviceType {
  timeDate: string;
  timeCreated: number;
  timeUpdated: number;
  deviceId: string;
  deviceName: string;
  registeredToUser: string;
}

export interface AddDeviceProps {
  deviceId: string;
  registeredToUser: string;
}

export interface GetAllPaginatedProps {
  limit: number;
  skip: number;
}

export interface SetDeviceNameProps {
  deviceId: string;
  name: string;
}

export interface DeviceSetupProps {
  device: DeviceType;
  onComplete: Function;
}
