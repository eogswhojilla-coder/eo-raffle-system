import React from 'react';
import RouletteWheel from '../../../_Components/RouletteWheel';

const WheelSection = ({ participants, onWinnerSelected, loading, onRefresh }) => {
    
    // ✅ HANDLE WINNER SELECTED - REFRESH PARTICIPANTS
    const handleWinnerSelected = (winner) => {
        if (onWinnerSelected) {
            onWinnerSelected(winner);
        }
        
        // ✅ Refresh participants list to exclude winner
        if (onRefresh) {
            onRefresh();
        }
    };

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Spin to Win!</h2>
                <p className="text-gray-600">
                    Participants remaining: <span className="font-bold text-green-600 text-xl">
                        {participants?.filter(p => !p.is_winner).length || 0}
                    </span>
                </p>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                        <p className="text-gray-500 text-xl">Loading participants...</p>
                    </div>
                </div>
            ) : !participants || participants.length === 0 ? (
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎫</div>
                        <p className="text-gray-500 text-xl">No participants available</p>
                        <p className="text-gray-400 mt-2">Register participants first to start the draw</p>
                    </div>
                </div>
            ) : (
                <RouletteWheel 
                    participants={participants}
                    onWinnerSelected={handleWinnerSelected}
                />
            )}
        </div>
    );
};

export default WheelSection;