import { NextApiRequest, NextApiResponse } from 'next';

import { deleteAllPosts } from '../../../../lib/posts';

const handler = async (_: NextApiRequest, response: NextApiResponse) => {
  const posts = await deleteAllPosts();
  return response.json(posts);
};

export default handler;
