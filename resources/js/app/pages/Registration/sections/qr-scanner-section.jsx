import React, { useState } from 'react';
import QRScanner from '../../../_Components/QRScanner';

const QRScannerSection = ({ onScanSuccess }) => {
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = (decodedText) => {
        onScanSuccess(decodedText);
        setIsScanning(false);
    };

    return (
        <div className="relative bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    >
                        <div className="text-3xl opacity-30">
                            {['📱', '📷', '⚡', '✓'][Math.floor(Math.random() * 4)]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="relative z-10 p-8">
                {/* Header Section */}
                <div className="flex items-center mb-6 pb-6 border-b-2 border-indigo-100">
                    <div className="relative">
                        {/* QR Icon Container with Gradient */}
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        </div>
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 bg-indigo-400 rounded-xl animate-ping opacity-20"></div>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text pb-1">
                            QR Code Scanner
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-1"></div>
                    </div>
                </div>

                {/* Description with Icons */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-6 border border-indigo-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                            <span className="text-2xl">📱</span>
                        </div>
                        <p className="text-gray-700 font-medium flex-1">
                            Scan participant QR codes for instant registration
                        </p>
                        <div className="bg-white rounded-lg p-2 shadow-sm animate-pulse">
                            <span className="text-2xl">⚡</span>
                        </div>
                    </div>
                </div>

                {/* Scanner Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-inner border border-indigo-100 overflow-hidden">
                    {isScanning ? (
                        <div className="p-6">
                            <QRScanner onScanSuccess={handleScan} />
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            {/* Empty State */}
                            <div className="border-4 border-dashed border-indigo-300 rounded-2xl p-8 bg-gradient-to-br from-white to-indigo-50">
                                {/* Camera Icon with Animation */}
                                <div className="relative inline-block mb-4">
                                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg">
                                        <span className="text-5xl animate-bounce">📷</span>
                                    </div>
                                    {/* Scanning Effect Lines */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 border-4 border-indigo-400 rounded-full animate-ping opacity-20"></div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-700 mb-2">Ready to Scan</h3>
                                <p className="text-gray-500 mb-4">Click the button below to activate your camera</p>
                                
                                {/* Start Scanner Button */}
                                <button
                                    onClick={() => setIsScanning(true)}
                                    className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>Start Scanner</span>
                                    </span>
                                </button>

                                {/* Info Tips */}
                                <div className="mt-6 flex justify-center items-center space-x-6 text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-500">✓</span>
                                        <span>Instant Check-in</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-500">✓</span>
                                        <span>Auto Registration</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Corner Decoration */}
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-200 via-indigo-200 to-transparent rounded-tl-full opacity-20"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-200 via-purple-200 to-transparent rounded-br-full opacity-20"></div>
        </div>
    );
};

export default QRScannerSection;