import { NextApiRequest, NextApiResponse } from 'next';

import { getDeviceById, setDeviceName } from '../../../../lib/db/device';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    body: { deviceId, userId, name },
  } = request;

  if (!deviceId || !userId || !name) {
    return response.status(400).json({
      error: {
        code: 'bad_request',
        message: 'Invalid request.',
      },
    });
  }

  const device = await getDeviceById(deviceId);

  if (device.deviceId === deviceId && device.registeredToUser === userId) {
    const result = await setDeviceName({ deviceId, name });
    if (result.acknowledged) {
      return response
        .status(200)
        .json({ data: { message: `Device was named ${name}` }, deviceId });
    }
  } else {
    return response.status(400).json({
      error: {
        code: 'bad_request',
        message: 'Device is not registered to user.',
      },
    });
  }

  return response.status(500).json({
    error: {
      code: 'server_error',
      message: 'Could not set device name.',
    },
  });
};

export default handler;
