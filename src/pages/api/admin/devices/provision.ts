import { NextApiRequest, NextApiResponse } from 'next';

import { provisionDevice } from '../../../../lib/db/provisioned';

const handler = async (_: NextApiRequest, response: NextApiResponse) => {
  const device = await provisionDevice();
  return response.json(device);
};

export default handler;
