import { NextApiRequest, NextApiResponse } from 'next';

import { getDeviceById, setDeviceStatusOn } from '../../../../lib/db/device';
import { queryParamString } from '../../../../utils/utils';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { deviceId, userId },
  } = request;

  if (deviceId) {
    const device = await getDeviceById(deviceId);

    if (device.deviceId === deviceId && device.registeredToUser === userId) {
      // TODO: LOGIC TO TURN ON DEVICE

      const result = await setDeviceStatusOn({
        deviceId: queryParamString(deviceId),
      });

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
