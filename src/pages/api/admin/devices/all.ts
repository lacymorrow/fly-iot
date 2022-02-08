import { NextApiRequest, NextApiResponse } from 'next';

import { getAllDevicesPaginated } from '../../../../lib/db/device';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  let lim = 0;
  let skip = 0;
  const {
    query: { limit, page },
  } = request;

  // Massage query params
  if (typeof limit === 'string') {
    lim = Number.parseInt(limit, 10);
  }
  if (typeof page === 'string') {
    skip = Number.parseInt(page, 10);
  }

  const posts = await getAllDevicesPaginated({ limit: lim, skip });
  return response.json(posts);
};

export default handler;
