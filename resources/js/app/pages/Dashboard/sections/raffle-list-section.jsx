import React from 'react';
import RaffleList from '../../../_Components/RaffleList';

const RaffleListSection = () => {
    return (
        <div className="mb-12">
            <div className="flex items-center mb-6">
                <div className="w-1 h-8 bg-blue-600 rounded-full mr-3"></div>
                <h2 className="text-3xl font-bold text-gray-800">Active Raffles</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
                <RaffleList />
            </div>
        </div>
    );
};

export default RaffleListSection;