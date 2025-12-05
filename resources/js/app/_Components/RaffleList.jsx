import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RaffleList = () => {
    const [raffles, setRaffles] = useState([]);

    useEffect(() => {
        const fetchRaffles = async () => {
            try {
                const response = await axios.get('/api/raffles');
                setRaffles(response.data);
            } catch (error) {
                console.error('Error fetching raffles:', error);
            }
        };

        fetchRaffles();
    }, []);

    if (!raffles || raffles.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No raffles available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {raffles.map((raffle) => (
                <div key={raffle.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-xl font-bold mb-2">{raffle.raffle_name}</h3>
                    <p className="text-gray-600 mb-4">{raffle.description}</p>
                    <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                            raffle.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                            {raffle.status}
                        </span>
                        <button className="text-blue-500 hover:text-blue-700">
                            View Details →
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RaffleList;
