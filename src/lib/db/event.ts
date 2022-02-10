/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
// import { ObjectId } from 'mongodb';

import clientPromise from '../mongodb';

export const addEvent = async (props: any) => {
  const client = await clientPromise;

  const device = await client
    .db(process.env.MONGODB_DB)
    .collection('events')
    .insertOne({
      timeCreated: Date.now(),
      deviceId: props.deviceId,
      startTime: props.start,
      stopTime: props.end,
      // portId: props.portId,
    });

  return device;
};
