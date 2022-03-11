import { NextApiRequest, NextApiResponse } from 'next';

import { getDeviceById } from '../../../../lib/db/device';
import { getAllEventsByDeviceId } from '../../../../lib/db/event';
import { queryParamString } from '../../../../utils/utils';

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

  const {
    query: { sync: deviceIdQ },
  } = request;
  const deviceId = queryParamString(deviceIdQ);

  if (deviceId) {
    // TODO: authentication
    const device = await getDeviceById(deviceId);
    const schedule = await getAllEventsByDeviceId(deviceId);
    return response.json({ device, schedule });
  }

  return response.status(404).json({
    error: {
      code: 'not_found',
      message: 'Device not found.',
    },
  });
};

export default handler;
