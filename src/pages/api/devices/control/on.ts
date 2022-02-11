import { NextApiRequest, NextApiResponse } from 'next';

import { getDeviceById, setDeviceStatusOn } from '../../../../lib/db/device';
import { currentTimeString } from '../../../../utils/utils';

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
      // TODO: LOGIC TO TURN ON DEVICE
      console.log(
        `[Control:on] Device ${deviceId} was turned on at ${currentTimeString()}`
      );

      const result = await setDeviceStatusOn(deviceId);

      if (result.acknowledged) {
        return response.status(200).json({
          data: { message: `Device ${deviceId} was turned on.` },
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
