/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
// import { ObjectId } from 'mongodb';

import { currentTime } from '../../utils/utils';
import clientPromise from '../mongodb';
import { getAllDevicesByUserId } from './device';
import { DeviceType } from './device.types';
import { AddEventProps } from './event.types';

const { MONGO_DB } = process.env;

export const addEvent = async ({
  deviceId,
  name,
  start,
  stop,
}: AddEventProps) => {
  const client = await clientPromise;

  const result = await client.db(MONGO_DB).collection('events').insertOne({
    timeCreated: currentTime(),
    name,
    deviceId,
    start,
    stop,
  });

  return result;
};

export const getAllEventsByDeviceId = async (deviceId: string) => {
  const client = await clientPromise;

  let results = await client
    .db(MONGO_DB)
    .collection('events')
    .find({ deviceId }, { _id: 0 })
    .toArray();

  if (!results) {
    return false;
  }

  results = results.map((device: any) => {
    return { ...device, _id: device._id.toString() };
  });

  return results;
};

export const getAllEventsByUserId = async (userId: string) => {
  const devices = await getAllDevicesByUserId(userId);
  const deviceEvents = await Promise.all(
    devices.map(async (device: DeviceType) => {
      const events = await getAllEventsByDeviceId(device.deviceId);
      return { device, events };
    })
  );

  return deviceEvents;
};
