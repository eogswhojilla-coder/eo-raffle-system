import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipants, fetchWinners } from '../../../redux/raffle-thunk';

const StatsSection = () => {
    const dispatch = useDispatch();
    const { participants, winners } = useSelector((state) => state.raffle);
    const [raffleCount, setRaffleCount] = useState(0);

    useEffect(() => {
        dispatch(fetchParticipants());
        dispatch(fetchWinners());
    }, [dispatch]);

    const stats = [
        {
            label: 'Total Participants',
            value: participants.length,
            icon: '👥',
            gradient: 'from-blue-500 to-blue-600',
            bgGradient: 'from-blue-50 to-blue-100',
            iconBg: 'bg-blue-100',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-500'
        },
        {
            label: 'Active Raffles',
            value: raffleCount,
            icon: '🎫',
            gradient: 'from-purple-500 to-purple-600',
            bgGradient: 'from-purple-50 to-purple-100',
            iconBg: 'bg-purple-100',
            textColor: 'text-purple-600',
            borderColor: 'border-purple-500'
        },
        {
            label: 'Winners Drawn',
            value: winners.length,
            icon: '🏆',
            gradient: 'from-yellow-500 to-orange-500',
            bgGradient: 'from-yellow-50 to-orange-100',
            iconBg: 'bg-yellow-100',
            textColor: 'text-orange-600',
            borderColor: 'border-yellow-500'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 px-4">
            {stats.map((stat, index) => (
                <div 
                    key={index}
                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105"
                >
                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Top Border Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`}></div>
                    
                    {/* Content */}
                    <div className="relative p-8">
                        <div className="flex items-start justify-between mb-4">
                            {/* Icon */}
                            <div className={`${stat.iconBg} rounded-2xl p-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                <span className="text-4xl">{stat.icon}</span>
                            </div>
                            
                            {/* Decorative Element */}
                            <div className="flex space-x-1">
                                <div className={`w-1 h-8 bg-gradient-to-b ${stat.gradient} rounded-full opacity-30`}></div>
                                <div className={`w-1 h-12 bg-gradient-to-b ${stat.gradient} rounded-full opacity-50`}></div>
                                <div className={`w-1 h-8 bg-gradient-to-b ${stat.gradient} rounded-full opacity-30`}></div>
                            </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="space-y-2">
                            <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                                {stat.label}
                            </p>
                            <p className={`text-5xl font-black ${stat.textColor} group-hover:scale-105 transition-transform duration-300 inline-block`}>
                                {stat.value}
                            </p>
                        </div>
                        
                        {/* Bottom Decorative Line */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <div className={`h-1 bg-gradient-to-r ${stat.gradient} rounded-full w-0 group-hover:w-full transition-all duration-500`}></div>
                        </div>
                    </div>
                    
                    {/* Corner Decoration */}
                    <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${stat.bgGradient} rounded-tl-full opacity-20`}></div>
                </div>
            ))}
        </div>
    );
};

export default StatsSection;