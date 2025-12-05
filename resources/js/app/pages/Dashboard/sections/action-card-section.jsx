import React from 'react';
import { Link } from 'react-router-dom';

const ActionCards = () => {
    const cards = [
        {
            title: 'Registration',
            description: 'Register participants and scan QR codes for raffle entry',
            icon: '📋',
            path: '/registration',
            gradient: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Raffle Draw',
            description: 'Spin the roulette wheel and select lucky winners',
            icon: '🎰',
            path: '/draw',
            gradient: 'from-blue-600 to-blue-700',
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {cards.map((card, index) => (
                <Link 
                    key={index}
                    to={card.path}
                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <div className="relative p-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-16 h-16 bg-blue-100 group-hover:bg-white/20 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300">
                                {card.icon}
                            </div>
                            <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                            {card.title}
                        </h2>
                        <p className="text-gray-600 group-hover:text-blue-50 transition-colors duration-300">
                            {card.description}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ActionCards;