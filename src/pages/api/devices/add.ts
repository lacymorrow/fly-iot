// Validate that device is not duplicate, exists
import { NextApiRequest, NextApiResponse } from 'next';

import { addDevice } from '../../../lib/db/device';
import { getProvisioned } from '../../../lib/db/provisioned';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { deviceId } = req.body;
    const provisioned = await getProvisioned(deviceId);
    if (!provisioned) {
      return res.status(404).json({
        error: {
          code: 'not_found',
          message: 'Invalid device ID, or device has not been provisioned.',
        },
      });
    }
    if (provisioned?.registered) {
      // Todo: If already registered to user, say so

      return res.status(302).json({
        error: {
          code: 'found',
          message: 'This device has already been registered.',
        },
      });
    }

    // Provisioned device exists and is not provisioned
    const newDevice = await addDevice({ deviceId });
    console.log('newdevice', newDevice);
    if (newDevice) {
      return res.status(200).json({ deviceId });
    }
  }

  // Invalid method
  return res.status(400).json({
    error: {
      code: 'bad_request',
      message:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
};

export default handler;
