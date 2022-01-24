import { NextApiRequest, NextApiResponse } from 'next';

import { getPost } from '../../../lib/posts';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { postId },
  } = request;

  if (postId) {
    const post = await getPost(postId);
    return response.json(post);
  }

  // Fallback to most recent post
  // const post = await getFirstPost();
  // return response.json(post);

  return response.status(404);
};

export default handler;
