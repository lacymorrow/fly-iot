import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        console.log('[CRON] SYNC TRIGGERED');
        // DO STUFF
        // Find events with start/stop within X time ago
        // Turn Devices on/off

        return res.status(200).json({ success: true });
      }

      console.error('[CRON] Error: Unauthorized');
      return res.status(401).json({ success: false });
    } catch (error: any) {
      console.error(`[CRON] Error: ${error}`);
      return res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    console.error(`[CRON] Error: Method not allowed`);
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
};
export default handler;
