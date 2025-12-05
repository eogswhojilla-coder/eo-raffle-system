import React from 'react';
import ParticipantForm from '../../../_Components/ParticipantForm';

const RegistrationFormSection = ({ onRegisterSuccess }) => {
    return (
        <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl overflow-hidden">
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
                            {['✍️', '👤', '✓', '⭐'][Math.floor(Math.random() * 4)]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

            <div className="relative z-10 p-8">
                {/* Header Section */}
                <div className="flex items-center mb-6 pb-6 border-b-2 border-blue-100">
                    <div className="relative">
                        {/* Icon Container with Gradient */}
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 bg-blue-400 rounded-2xl animate-ping opacity-20"></div>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl font-black bg-gradient-to-r from-blue-700 to-indigo-700 text-transparent bg-clip-text pb-1">
                            Manual Registration
                        </h2>
                        <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1"></div>
                    </div>
                </div>

                {/* Description with Icons */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-blue-200 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                            <span className="text-2xl">📝</span>
                        </div>
                        <p className="text-gray-700 font-medium flex-1">
                            Fill in participant details to generate a QR code
                        </p>
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                            <span className="text-2xl">📱</span>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-inner border border-blue-100">
                    <ParticipantForm onRegister={onRegisterSuccess} />
                </div>
            </div>

            {/* Bottom Corner Decoration */}
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-indigo-200 via-blue-200 to-transparent rounded-tl-full opacity-20"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-200 via-indigo-200 to-transparent rounded-br-full opacity-20"></div>
        </div>
    );
};

export default RegistrationFormSection;