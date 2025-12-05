import React, { useState } from 'react';
import QrReader from 'react-qr-reader';

const QRCodeScanner = () => {
    const [data, setData] = useState('No result');

    const handleScan = (data) => {
        if (data) {
            setData(data);
            // You can add additional logic here to handle the scanned QR code data
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
            <h2>QR Code Scanner</h2>
            <QrReader
                onScan={handleScan}
                onError={handleError}
                style={{ width: '100%' }}
            />
            <p>{data}</p>
        </div>
    );
};

export default QRCodeScanner;