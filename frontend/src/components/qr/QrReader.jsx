import React, { useState } from 'react';
import { QrReader as ReactQrReader } from 'react-qr-reader';

const QrReader = () => {
  const [data, setData] = useState('No result');

  return (
    <>
      <ReactQrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{ width: '100%' }}
        scanDelay = {1000}
      />
    </>
  );
};

export default QrReader;