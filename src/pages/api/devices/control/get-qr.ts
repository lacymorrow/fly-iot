import { NextApiRequest, NextApiResponse } from 'next';

import { getQrCode } from '../../../../utils/utils';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    // Invalid method
    return response.status(400).json({
      error: {
        code: 'bad_request',
        message:
          "The requested endpoint was not found or doesn't support this method.",
      },
    });
  }

  const { data } = request.body;

  // const {
  //   query: { data },
  // } = request;

  const qrcode = await getQrCode(data);

  if (qrcode) {
    return response.status(200).json({
      data: qrcode,
    });
  }

  return response.status(500).json({
    error: {
      code: 'not_found',
      message: 'Could not connect to device.',
    },
  });
};

export default handler;
