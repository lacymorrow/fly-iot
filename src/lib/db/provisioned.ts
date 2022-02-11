/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';

import { currentTime, currentTimeString } from '../../utils/utils';
import clientPromise from '../mongodb';
import { GetAllPaginatedProps } from './device.types';
import {
  ProvisionDeviceProps,
  RegisterProvisionedDeviceProps,
} from './provisioned.types';

const { MONGO_DB } = process.env;

// TODO: deviceId
export const provisionDevice = async (props?: ProvisionDeviceProps) => {
  const client = await clientPromise;

  const result = await client
    .db(MONGO_DB)
    .collection('provisioned')
    .insertOne({
      timeDate: currentTimeString(),
      timeCreated: currentTime(),
      timeUpdated: currentTime(),

      ...props,
    });

  return result;
};

export const registerProvisionedDevice = async (
  props: RegisterProvisionedDeviceProps
) => {
  const { deviceId, userId } = props;
  const oId = new ObjectId(deviceId);

  const client = await clientPromise;
  const result = await client
    .db(MONGO_DB)
    .collection('provisioned')
    .updateOne(
      { _id: oId },
      { $set: { registeredToUser: userId, timeUpdated: currentTime() } }
    );

  return result;
};

export const getAllProvisionedPaginated = async ({
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

export const getAllProvisioned = () =>
  getAllProvisionedPaginated({ limit: 0, skip: 0 });

export const getProvisioned = async (deviceId: string) => {
  // Return a single document with a given deviceId
  const client = await clientPromise;

  try {
    if (!deviceId) {
      throw new Error('Invalid deviceId');
    }

    const oId = new ObjectId(deviceId);

    const result = await client
      .db(MONGO_DB)
      .collection('provisioned')
      .findOne({ _id: oId });

    // Convert `new ObjectId('...')` to string '...'
    return { ...result, _id: result._id.toString() };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllProvisionedIds = async () => {
  const devices = await getAllProvisioned();
  const paths = devices.map((device: any) => {
    return device._id.toString();
  });

  return paths;
};

export const deleteAllProvisionedDevices = async () => {
  const client = await clientPromise;

  try {
    await client.db(MONGO_DB).collection('provisioned').deleteMany({});

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
