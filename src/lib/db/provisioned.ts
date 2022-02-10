/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { ObjectId } from 'mongodb';

import clientPromise from '../mongodb';

// TODO: deviceId
export const provisionDevice = async (props?: {
  deviceId?: string;
  ports: number;
}) => {
  const client = await clientPromise;

  const result = await client
    .db(process.env.MONGODB_DB)
    .collection('provisioned')
    .insertOne({
      timeDate: String(new Date()),
      timeCreated: Date.now(),
      ...props,
    });

  return result;
};

export const registerProvisionedDevice = async (props: {
  deviceId: string;
  userId: string;
}) => {
  const { deviceId, userId } = props;
  const oId = new ObjectId(deviceId);

  const client = await clientPromise;
  const result = await client
    .db(process.env.MONGODB_DB)
    .collection('provisioned')
    .updateOne({ _id: oId }, { $set: { registeredToUser: userId } });

  return result;
};

export const addDevice = async (props: any) => {
  const client = await clientPromise;

  const result = await client
    .db(process.env.MONGODB_DB)
    .collection('devices')
    .insertOne({
      // createdByUser: '61e8717cd38d770f67357134',
      timeDate: String(new Date()),
      timeCreated: Date.now(),
      timeUpdated: Date.now(),
      ...props,
    });

  return result;
};

export const getAllProvisionedPaginated = async ({
  limit,
  skip,
}: {
  limit: number;
  skip: number;
}) => {
  const client = await clientPromise;

  let devices = await client
    .db(process.env.MONGODB_DB)
    .collection('devices')
    .find({})
    .sort({ $natural: -1 })
    .skip(skip > 0 ? (skip - 1) * limit : 0)
    .limit(limit)
    .toArray();

  // Convert `new ObjectId('...')` to string '...'
  devices = devices.map((device: any) => {
    return { ...device, _id: device._id.toString() };
  });

  return devices;
};

export const getAllProvisioned = () =>
  getAllProvisionedPaginated({ limit: 0, skip: 0 });

export const getProvisioned = async (deviceId: string | string[]) => {
  // Return a single document with a given deviceId
  let id;
  const client = await clientPromise;

  try {
    if (!deviceId) {
      throw new Error('Invalid deviceId');
    }

    if (typeof deviceId === 'object') {
      [id] = deviceId;
    } else {
      id = deviceId;
    }

    const oId = new ObjectId(id);

    const device = await client
      .db(process.env.MONGODB_DB)
      .collection('provisioned')
      .findOne({ _id: oId });

    // Convert `new ObjectId('...')` to string '...'
    return { ...device, _id: device._id.toString() };
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
    await client
      .db(process.env.MONGODB_DB)
      .collection('provisioned')
      .deleteMany({});

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
