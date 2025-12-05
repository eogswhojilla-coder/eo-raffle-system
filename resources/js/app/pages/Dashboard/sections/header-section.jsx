import React from 'react';

const HeaderSection = () => {
    return (
        <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20 px-8 shadow-2xl overflow-hidden">
            {/* Twinkling Stars Background */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                    >
                        <div
                            className="rounded-full bg-white"
                            style={{
                                width: `${2 + Math.random() * 4}px`,
                                height: `${2 + Math.random() * 4}px`,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center space-y-6">
                    {/* Trophy Icon */}
                    <div className="inline-block animate-bounce">
                        <div className="text-8xl mb-4">
                            🎰
                        </div>
                    </div>

                    {/* Main Title */}
                    <div className="space-y-3">
                        <h1 className="text-7xl font-black tracking-tight animate-pulse">
                            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-transparent bg-clip-text drop-shadow-2xl">
                                Empire One
                            </span>
                        </h1>
                        <h2 className="text-6xl font-bold tracking-wide">
                            <span className="bg-gradient-to-r from-blue-200 to-purple-200 text-transparent bg-clip-text">
                                Grand Raffle
                            </span>
                        </h2>
                    </div>

                    {/* Decorative Line */}
                    <div className="flex items-center justify-center space-x-4 py-4">
                        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></div>
                        <div className="text-4xl animate-spin" style={{ animationDuration: '3s' }}>⭐</div>
                        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></div>
                    </div>

                    {/* Subtitle Badge */}
                    <div className="inline-block bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white border-opacity-30 rounded-2xl px-8 py-4 shadow-xl transform hover:scale-105 transition-transform duration-300">
                        <p className="text-3xl font-bold text-yellow-300 drop-shadow-lg">
                            🎉 Year End 2025 🎉
                        </p>
                    </div>

                    {/* Decorative Emojis */}
                    <div className="flex justify-center items-center space-x-8 pt-4 text-2xl">
                        <span className="opacity-70 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }}>🎁</span>
                        <span className="opacity-70 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '2s' }}>✨</span>
                        <span className="opacity-70 animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2s' }}>🏆</span>
                        <span className="opacity-70 animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }}>✨</span>
                        <span className="opacity-70 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '2s' }}>🎁</span>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent opacity-30 pointer-events-none"></div>
        </div>
    );
};

export default HeaderSection;