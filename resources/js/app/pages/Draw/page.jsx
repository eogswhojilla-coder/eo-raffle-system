import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchParticipants, fetchWinners, selectWinner } from "../../redux/raffle-thunk";
import HeaderSection from "./sections/header-section";
import WheelSection from "./sections/wheel-section";
import WinnersSection from "./sections/winners-section";

const Page = () => {
    const dispatch = useDispatch();
    const { participants = [], winners = [], loading, error } = useSelector((state) => state.raffle);

    useEffect(() => {
        const loadData = async () => {
            try {
                await dispatch(fetchParticipants()).unwrap();
                await dispatch(fetchWinners()).unwrap();
            } catch (err) {
                toast.error('Failed to load data. Please refresh the page.');
            }
        };
        
        loadData();
    }, [dispatch]);

    // ✅ HANDLE WINNER SELECTED
    const handleWinnerSelected = async (winner) => {
        if (!winner) {
            await refreshData();
            return;
        }

        try {
            await dispatch(selectWinner({
                participant_id: winner.id,
                prize_name: 'Grand Prize'
            })).unwrap();
            
            toast.success('🏆 Winner recorded successfully!');
            
            // Play winner sound
            const audio = new Audio('/sounds/winner.mp3');
            audio.play();
            
            // Refresh data after winner is recorded
            await refreshData();
            
        } catch (error) {
            console.error('Error selecting winner:', error);
            
            // ✅ Handle "already won" case silently - just refresh
            if (error?.message?.includes('already won')) {
                toast.info('Refreshing participants list...');
            } else {
                toast.error(`Failed to record winner: ${error?.message || 'Unknown error'}`);
            }
            
            // Refresh data anyway
            await refreshData();
        }
    };

    const refreshData = async () => {
        try {
            await dispatch(fetchParticipants()).unwrap();
            await dispatch(fetchWinners()).unwrap();
        } catch (err) {
            console.error('Failed to refresh data:', err);
        }
    };

    const eligibleParticipants = participants.filter(p => !p.is_winner);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <HeaderSection />

            <div className="max-w-7xl mx-auto px-8 py-8">
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-700 font-semibold">{error}</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <WheelSection 
                        participants={eligibleParticipants}
                        onWinnerSelected={handleWinnerSelected}
                        onRefresh={refreshData}
                        loading={loading}
                    />

                    <WinnersSection winners={winners} />
                </div>
            </div>
        </div>
    );
};

export default Page;