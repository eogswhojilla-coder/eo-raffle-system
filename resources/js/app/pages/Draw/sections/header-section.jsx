import React from 'react';
import { Link } from 'react-router-dom';

const HeaderSection = () => {
    return (
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-8 px-8 shadow-2xl overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    >
                        <div className="text-white text-2xl opacity-50">
                            {['🎰', '🎲', '🍀', '⭐'][Math.floor(Math.random() * 4)]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Left Section - Title */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center space-x-4 mb-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-bounce">
                                <span className="text-5xl">🎰</span>
                            </div>
                            <div>
                                <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg">
                                    Raffle Draw
                                </h1>
                                <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-full mt-2"></div>
                            </div>
                        </div>
                        <p className="text-green-100 text-xl font-medium flex items-center justify-center md:justify-start space-x-2">
                            <span className="text-2xl animate-spin" style={{ animationDuration: '3s' }}>🎡</span>
                            <span>Spin the wheel to select lucky winners</span>
                            <span className="text-2xl">✨</span>
                        </p>
                    </div>

                    {/* Right Section - Back Button */}
                    <div>
                        <Link 
                            to="/" 
                            className="group relative bg-white/20 hover:bg-white/30 backdrop-blur-md px-8 py-4 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-2xl border-2 border-white/30 hover:border-white/50 transform hover:scale-105"
                        >
                            <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg">Back to Dashboard</span>
                        </Link>
                    </div>
                </div>

                {/* Bottom Decorative Elements */}
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                </div>
            </div>

            {/* Bottom Shadow Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default HeaderSection;