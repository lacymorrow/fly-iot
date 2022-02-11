import { NextApiRequest, NextApiResponse } from 'next';

import { getDeviceById, setDeviceStatusOff } from '../../../../lib/db/device';
import { currentTimeString, queryParamString } from '../../../../utils/utils';

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

  const { deviceId, userId } = request.body;

  if (deviceId) {
    const device = await getDeviceById(deviceId);

    if (device.deviceId === deviceId && device.registeredToUser === userId) {
      // TODO: LOGIC TO TURN OFF DEVICE

      console.log(
        `[Control:off] Device ${deviceId} was turned off at ${currentTimeString()}`
      );

      const result = await setDeviceStatusOff({
        deviceId: queryParamString(deviceId),
      });

      if (result.acknowledged) {
        return response.status(200).json({
          data: { message: `Device ${deviceId} was turned off.` },
          deviceId,
        });
      }
    }
  }

  return response.status(500).json({
    error: {
      code: 'not_found',
      message: 'Could not connect to device.',
    },
  });
};

export default handler;
