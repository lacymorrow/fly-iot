import { NextApiRequest, NextApiResponse } from 'next';

import { deleteAllProvisionedDevices } from '../../../../../lib/db/provisioned';

const handler = async (_: NextApiRequest, response: NextApiResponse) => {
  const result = await deleteAllProvisionedDevices();
  return response.json(result);
};

export default handler;
