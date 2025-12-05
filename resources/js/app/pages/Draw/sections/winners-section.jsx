import React from 'react';

const WinnersSection = ({ winners = [] }) => {
    return (
        <div className="relative bg-gradient-to-br from-amber-50 via-white to-yellow-50 rounded-3xl shadow-2xl overflow-hidden lg:sticky lg:top-6">
            {/* Top Gradient Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>
            
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                {[...Array(10)].map((_, i) => (
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
                        <div className="text-3xl">🏆</div>
                    </div>
                ))}
            </div>

            <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-yellow-200">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-3 shadow-lg animate-pulse">
                            <span className="text-3xl">🏆</span>
                        </div>
                        <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 text-transparent bg-clip-text">
                            Winners
                        </h2>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                        <span className="text-lg">{winners.length}</span> Total
                    </div>
                </div>
                
                {/* Winners List */}
                <div className="overflow-y-auto max-h-[600px] space-y-4 pr-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
                    {winners.length === 0 ? (
                        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-yellow-300">
                            <div className="bg-yellow-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <span className="text-6xl animate-bounce">🎉</span>
                            </div>
                            <p className="text-gray-600 text-xl font-semibold mb-2">No winners yet</p>
                            <p className="text-gray-400 text-sm">Spin the wheel to select winners</p>
                            
                            {/* Decorative dots */}
                            <div className="flex justify-center items-center space-x-2 mt-6">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    ) : (
                        winners.map((winner, index) => (
                            <div 
                                key={winner.id || index} 
                                className="group relative bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-200 rounded-2xl p-5 hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden"
                            >
                                {/* Gradient border effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                                
                                {/* Winner rank badge */}
                                <div className="absolute -top-1 -left-1 bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-xs font-black px-3 py-1 rounded-br-2xl rounded-tl-xl shadow-lg">
                                    #{winners.length - index}
                                </div>

                                <div className="relative flex items-start justify-between pt-3">
                                    <div className="flex-1 space-y-2">
                                        {/* Name */}
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <p className="font-black text-gray-800 text-lg">
                                                {winner.participant?.attendee_name || 'Unknown'}
                                            </p>
                                        </div>
                                        
                                        {/* Prize */}
                                        {winner.prize_name && (
                                            <div className="flex items-center space-x-2 bg-orange-100 rounded-lg px-3 py-1.5 inline-flex">
                                                <span className="text-lg">🎁</span>
                                                <p className="text-sm text-orange-800 font-bold">
                                                    {winner.prize_name}
                                                </p>
                                            </div>
                                        )}
                                        
                                        {/* Contact Info */}
                                        <div className="space-y-1 pt-2 border-t border-yellow-100">
                                            {winner.participant?.email && (
                                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                                    <span className="text-blue-500">📧</span>
                                                    <span className="font-medium">{winner.participant.email}</span>
                                                </div>
                                            )}
                                            {winner.participant?.contact_number && (
                                                <div className="flex items-center space-x-2 text-xs text-gray-600">
                                                    <span className="text-green-500">📱</span>
                                                    <span className="font-medium">{winner.participant.contact_number}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Timestamp */}
                                        <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2">
                                            <span>🕒</span>
                                            <span>{new Date(winner.drawn_at).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Trophy Icon */}
                                    <div className="ml-4">
                                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-3 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                            <span className="text-3xl">🏆</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Bottom corner decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-yellow-200 to-transparent rounded-tl-full opacity-30"></div>
        </div>
    );
};

export default WinnersSection;