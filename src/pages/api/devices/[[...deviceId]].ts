import { NextApiRequest, NextApiResponse } from 'next';

import { getDevice } from '../../../lib/db/device';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { deviceId },
  } = request;

  if (deviceId) {
    const device = await getDevice(deviceId);
    return response.json(device);
  }

  // Fallback to most recent device
  // const device = await getFirstDevice();
  // return response.json(device);

  return response.status(404);
};

export default handler;
