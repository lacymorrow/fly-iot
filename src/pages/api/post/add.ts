// Validate that post is not duplicate
import { NextApiRequest, NextApiResponse } from 'next';

import { addPost } from '../../../lib/posts';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const newPost = await addPost(req.body);
    if (newPost) {
      return res.status(200).json({
        message: 'Your message was sent, thanks for reaching out  🚀',
      });
    }
  }

  // Invalid method
  return res.status(404).json({
    error: {
      code: 'not_found',
      message:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
};

export default handler;
