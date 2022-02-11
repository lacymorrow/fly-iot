import { NextApiRequest, NextApiResponse } from 'next';

import { getDeviceById } from '../../../../lib/db/device';
import { addEvent } from '../../../../lib/db/event';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    // Invalid method
    return response.status(400).json({
      error: {
        code: 'bad_request',
        message:
          "The requested endpoint was not found or doesn't support this method.",
      },
    });
  }
  const { deviceId, userId, event } = request.body;
  const { start, stop, name } = event;

  if (!deviceId || !userId || !event) {
    return response.status(400).json({
      error: {
        code: 'bad_request',
        message: 'Invalid request.',
      },
    });
  }

  // Todo: May not need this lookup
  const device = await getDeviceById(deviceId);

  if (device.deviceId === deviceId && device.registeredToUser === userId) {
    const result = await addEvent({ deviceId, start, stop, name });
    if (result.acknowledged) {
      return response.status(200).json({
        data: {
          message: `This device will run from ${event.start}${
            event.stop && ` to ${event.stop}`
          }`,
        },
        deviceId,
      });
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
      message: 'Could not set device event.',
    },
  });
};

export default handler;
