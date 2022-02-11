/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';

import {
  currentTime,
  currentTimeString,
  generateRandom,
} from '../../utils/utils';
import clientPromise from '../mongodb';
import {
  AddDeviceProps,
  GetAllPaginatedProps,
  SetDeviceNameProps,
} from './device.types';

const { MONGO_DB } = process.env;

export const addDevice = async (props: AddDeviceProps) => {
  const client = await clientPromise;

  const result = await client
    .db(MONGO_DB)
    .collection('devices')
    .insertOne({
      timeDate: currentTimeString(),
      timeCreated: currentTime(),
      timeUpdated: currentTime(),
      deviceName: 'Device',
      ...props,
    });

  return result;
};

export const getAllDevicesPaginated = async ({
  limit,
  skip,
}: GetAllPaginatedProps) => {
  const client = await clientPromise;

  let results = await client
    .db(MONGO_DB)
    .collection('devices')
    .find({})
    .sort({ $natural: -1 })
    .skip(skip > 0 ? (skip - 1) * limit : 0)
    .limit(limit)
    .toArray();

  // Convert `new ObjectId('...')` to string '...'
  results = results.map((device: any) => {
    return { ...device, _id: device._id.toString() };
  });

  return results;
};

export const getAllDevices = () =>
  getAllDevicesPaginated({ limit: 0, skip: 0 });

export const getAllDevicesByUserId = async (userId: string) => {
  // Return a single document with a given deviceId
  const client = await clientPromise;

  try {
    if (!userId) {
      throw new Error('Invalid userId');
    }

    let results = await client
      .db(MONGO_DB)
      .collection('devices')
      .find({ registeredToUser: userId })
      .toArray();

    if (!results) {
      return false;
    }

    results = results.map((device: any) => {
      return { ...device, _id: device._id.toString() };
    });

    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getDevice = async (deviceId: string) => {
  // Return a single document with a given deviceId
  const client = await clientPromise;

  try {
    if (!deviceId) {
      throw new Error('Invalid deviceId');
    }

    const oId = new ObjectId(deviceId);

    const result = await client
      .db(MONGO_DB)
      .collection('devices')
      .findOne({ _id: oId });

    // Convert `new ObjectId('...')` to string '...'
    return { ...result, _id: result._id.toString() };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFirstDevice = async () => {
  const client = await clientPromise;

  const result = await client
    .db(MONGO_DB)
    .collection('devices')
    .findOne({}, { sort: { $natural: -1 } });

  // Convert `new ObjectId('...')` to string '...'
  const { _id, ...rest } = result;
  return { _id: _id.toString(), ...rest };
};

export const getDeviceById = async (deviceId: string) => {
  // Return a single document with a given deviceId
  const client = await clientPromise;

  try {
    if (!deviceId) {
      throw new Error('Invalid deviceId');
    }

    const result = await client
      .db(MONGO_DB)
      .collection('devices')
      .findOne({ deviceId });

    if (!result) {
      return false;
    }

    return { ...result, _id: result._id.toString() };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllDeviceIds = async () => {
  const results = await getAllDevices();
  const paths = results.map((device: any) => {
    return device._id.toString();
  });

  return paths;
};

export const getRandomDeviceId = async () => {
  const ids = await getAllDeviceIds();

  return ids[generateRandom(ids.length)];
};

export const setDeviceName = async (props: SetDeviceNameProps) => {
  const { deviceId, name } = props;

  const client = await clientPromise;
  const result = await client
    .db(MONGO_DB)
    .collection('devices')
    .updateOne(
      { deviceId },
      { $set: { deviceName: name, timeUpdated: currentTime() } }
    );

  return result;
};

export const setDeviceStatusOn = async (props: { deviceId: string }) => {
  const { deviceId } = props;

  const client = await clientPromise;
  const result = await client
    .db(MONGO_DB)
    .collection('devices')
    .updateOne(
      { deviceId },
      { $set: { status: 'on', timeUpdated: currentTime() } }
    );

  return result;
};

export const setDeviceStatusOff = async (props: { deviceId: string }) => {
  const { deviceId } = props;

  const client = await clientPromise;
  const result = await client
    .db(MONGO_DB)
    .collection('devices')
    .updateOne(
      { deviceId },
      { $set: { status: 'off', timeUpdated: currentTime() } }
    );

  return result;
};

export const deleteDevice = async (deviceId: string) => {
  // Return a single document with a given deviceId
  const client = await clientPromise;

  try {
    if (!deviceId) {
      throw new Error('Invalid deviceId');
    }

    const oId = new ObjectId(deviceId);

    await client.db(MONGO_DB).collection('devices').remove({ _id: oId });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteAllDevices = async () => {
  const client = await clientPromise;

  try {
    await client.db(MONGO_DB).collection('devices').deleteMany({});

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
