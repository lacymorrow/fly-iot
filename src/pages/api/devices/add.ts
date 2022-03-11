// TODO: Validate that device is not duplicate, exists
import { NextApiRequest, NextApiResponse } from 'next';

import { addDevice, getDeviceById } from '../../../lib/db/device';
import {
  getProvisioned,
  registerProvisionedDevice,
} from '../../../lib/db/provisioned';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { deviceId, userId } = req.body;

    // is device provisioned?
    const provisioned = await getProvisioned(deviceId);
    if (!provisioned) {
      return res.status(404).json({
        error: {
          code: 'not_found',
          message: 'Invalid device ID, or device has not been provisioned.',
        },
      });
    }

    const device = await getDeviceById(deviceId);
    // is device registered to this user?
    if (provisioned?.registeredToUser === userId) {
      if (provisioned?.registeredToUser === userId) {
        return res.status(302).json({
          data: {
            code: 'found',
            message: `This device is already registered to you. You can view it in your dashboard. Device ID: ${deviceId}`,
          },
        });
      }
      // is device registered to another user?
      return res.status(400).json({
        error: {
          code: 'bad_request',
          message: `This device has already been registered. Device ID: ${deviceId}`,
        },
      });
    }

    // something went wrong, if a device is registered it should have a user attached
    if (device) {
      return res.status(500).json({
        error: {
          code: 'server_error',
          message: `This device was registered but never assigned. Device ID: ${deviceId}`,
        },
      });
    }

    // Provisioned device exists and is not provisioned
    const registered = await registerProvisionedDevice({ deviceId, userId });
    if (!registered.acknowledged) {
      return res.status(500).json({
        error: {
          code: 'server_error',
          message: `This device could not be registered. Device ID: ${deviceId}`,
        },
      });
    }

    // Success!
    const newDevice = await addDevice({ deviceId, registeredToUser: userId });
    if (newDevice.acknowledged) {
      return res
        .status(200)
        .json({ data: { message: `Device ID: ${deviceId}` }, deviceId });
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
