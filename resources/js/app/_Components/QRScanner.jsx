import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = ({ onScan, onError }) => {
    const scannerRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (isScanning && scannerRef.current) {
            const html5QrcodeScanner = new Html5QrcodeScanner(
                "qr-reader",
                { 
                    fps: 10, 
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                },
                false
            );

            html5QrcodeScanner.render(
                (decodedText, decodedResult) => {
                    console.log(`QR Code detected: ${decodedText}`);
                    if (onScan) {
                        onScan(decodedText, decodedResult);
                    }
                },
                (error) => {
                    // Ignore frequent scan errors
                    if (error && onError) {
                        console.warn(`QR Code scan error: ${error}`);
                    }
                }
            );

            return () => {
                html5QrcodeScanner.clear().catch(error => {
                    console.error("Failed to clear scanner", error);
                });
            };
        }
    }, [isScanning, onScan, onError]);

    return (
        <div className="qr-scanner-container">
            {!isScanning ? (
                <div className="text-center p-8">
                    <button
                        onClick={() => setIsScanning(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
                    >
                        Start QR Scanner
                    </button>
                </div>
            ) : (
                <div>
                    <div id="qr-reader" ref={scannerRef}></div>
                    <button
                        onClick={() => setIsScanning(false)}
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Stop Scanner
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRScanner;
