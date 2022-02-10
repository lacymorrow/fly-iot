import { NextApiRequest, NextApiResponse } from 'next';

import { getDeviceById } from '../../../lib/db/device';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { deviceId },
  } = request;

  if (deviceId) {
    const device = await getDeviceById(deviceId);
    return response.json(device);
  }

  return response.status(404).json({
    error: {
      code: 'not_found',
      message: 'Device not found.',
    },
  });
};

export default handler;
