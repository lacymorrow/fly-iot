import { NextApiRequest, NextApiResponse } from 'next';

import { deleteAllDevices } from '../../../../../lib/db/device';

const handler = async (_: NextApiRequest, response: NextApiResponse) => {
  const result = await deleteAllDevices();
  return response.json(result);
};

export default handler;
