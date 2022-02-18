import { useState } from 'react';

import { QrReader } from 'react-qr-reader';

// interface MetaProps {
//   title: string;
//   description: string;
//   canonical?: string;
// }

const QrScanner = () => {
  const [data, setData] = useState('No result');

  const onQr = (result: any, error: any) => {
    if (result) {
      setData(result?.text);
    }

    if (error) {
      console.info(error);
    }
  };

  return (
    <>
      <QrReader
        constraints={{ facingMode: { ideal: 'user' } }}
        onResult={onQr}
      />
      <p>{data}</p>
    </>
  );
};

export default QrScanner;
