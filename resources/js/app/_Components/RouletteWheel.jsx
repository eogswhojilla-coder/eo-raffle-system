import React, { useState } from "react";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const RouletteWheel = ({ participants, onWinnerSelected }) => {
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [winner, setWinner] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const eligibleParticipants = participants.filter((p) => !p.is_winner);

    const colorPattern = ["#d62828", "#2872d6", "#1f9a41", "#e5a823"];
    const colors = eligibleParticipants.map(
        (_, i) => colorPattern[i % colorPattern.length]
    );

    // ✅ AUTOMATIC FONT SIZE CALCULATION
    const calculateFontSize = () => {
        const count = eligibleParticipants.length;
        if (count <= 8) return 28;
        if (count <= 15) return 22;
        if (count <= 25) return 16;
        if (count <= 40) return 12;
        if (count <= 60) return 10;
        return 8;
    };

    // ✅ CALCULATE TEXT RADIUS BASED ON PARTICIPANT COUNT
    const calculateTextRadius = () => {
        const count = eligibleParticipants.length;
        if (count <= 8) return 180;   // Closer to center for few participants
        if (count <= 15) return 200;
        if (count <= 25) return 220;
        if (count <= 40) return 230;
        if (count <= 60) return 240;
        return 250;  // Very close to edge for many participants
    };

    const fontSize = calculateFontSize();
    const textRadius = calculateTextRadius();

    const spinWheel = async () => {
        if (spinning || eligibleParticipants.length === 0) return;

        // Confirmation dialog
        const result = await Swal.fire({
            title: '🎰 Ready to Spin?',
            text: `${eligibleParticipants.length} participants are eligible for the draw`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Spin Now!',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        setSpinning(true);
        setWinner(null);
        setShowModal(false);

        toast.loading('Spinning the wheel...', { id: 'spinning' });

        const spins = Math.floor(Math.random() * 5) + 8;
        const randomDegree = Math.floor(Math.random() * 360);
        const totalRotation = spins * 360 + randomDegree;

        setRotation((prev) => prev + totalRotation);

        setTimeout(() => {
            const winnerIndex = Math.floor(
                Math.random() * eligibleParticipants.length
            );
            const selectedWinner = eligibleParticipants[winnerIndex];

            setWinner(selectedWinner);
            setSpinning(false);
            
            toast.success('Winner selected!', { id: 'spinning' });
            
            setTimeout(() => {
                setShowModal(true);
            }, 500);

            if (onWinnerSelected) onWinnerSelected(selectedWinner);
        }, 5000);
    };

    const closeModal = () => {
        setShowModal(false);
        setWinner(null);
    };

    const segmentAngle = 360 / (eligibleParticipants.length || 1);

    return (
        <>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes scaleIn {
                        from { 
                            transform: scale(0.5);
                            opacity: 0;
                        }
                        to { 
                            transform: scale(1);
                            opacity: 1;
                        }
                    }

                    @keyframes flashBorder {
                        0%, 100% { 
                            box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.8);
                        }
                        50% { 
                            box-shadow: 0 0 40px 15px rgba(255, 215, 0, 1);
                        }
                    }

                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    @keyframes confetti {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }

                    .winner-modal-fade {
                        animation: fadeIn 0.3s ease-out;
                    }

                    .winner-modal-scale {
                        animation: scaleIn 0.5s ease-out;
                    }

                    .winner-flash-border {
                        animation: flashBorder 1s infinite;
                    }

                    .winner-gradient-text {
                        background-size: 200% 200%;
                        animation: gradient 3s ease infinite;
                    }

                    .winner-confetti {
                        animation: confetti linear forwards;
                    }
                `}
            </style>

            <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6 z-20">
                        <div
                            className="w-0 h-0 
                            border-l-[25px] border-l-transparent
                            border-r-[25px] border-r-transparent
                            border-t-[35px] border-t-blue-500
                            drop-shadow-lg"
                        ></div>
                    </div>

                    <div className="relative w-[600px] h-[600px]">
                        <svg
                            width="600"
                            height="600"
                            viewBox="0 0 600 600"
                            className="drop-shadow-xl"
                            style={{
                                transform: `rotate(${rotation}deg)`,
                                transition: spinning
                                    ? "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                                    : "none",
                            }}
                        >
                            <defs>
                                <filter id="textShadow">
                                    <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#000000" floodOpacity="0.8"/>
                                </filter>
                            </defs>

                            <circle
                                cx="300"
                                cy="300"
                                r="298"
                                fill="white"
                                stroke="#555"
                                strokeWidth="6"
                            />

                            {eligibleParticipants.map((p, i) => {
                                const startAngle =
                                    (i * segmentAngle - 90) * (Math.PI / 180);
                                const endAngle =
                                    ((i + 1) * segmentAngle - 90) * (Math.PI / 180);

                                const x1 = 300 + 290 * Math.cos(startAngle);
                                const y1 = 300 + 290 * Math.sin(startAngle);
                                const x2 = 300 + 290 * Math.cos(endAngle);
                                const y2 = 300 + 290 * Math.sin(endAngle);

                                const largeArc = segmentAngle > 180 ? 1 : 0;

                                const path = `M 300 300 L ${x1} ${y1} A 290 290 0 ${largeArc} 1 ${x2} ${y2} Z`;

                                const firstName = p.attendee_name.split(' ')[0];

                                return (
                                    <g key={p.id}>
                                        <path
                                            d={path}
                                            fill={colors[i]}
                                            stroke="#fff"
                                            strokeWidth="4"
                                        />

                                        <line
                                            x1="300"
                                            y1="300"
                                            x2={x1}
                                            y2={y1}
                                            stroke="white"
                                            strokeWidth="4"
                                        />

                                        {/* ✅ RADIALLY ALIGNED TEXT */}
                                        <text
                                            fill="#ffffff"
                                            fontSize={fontSize}
                                            fontWeight="bold"
                                            filter="url(#textShadow)"
                                            textAnchor="middle"
                                            transform={`
                                                rotate(${i * segmentAngle + segmentAngle / 2}, 300, 300)
                                                translate(300, ${300 - textRadius})
                                            `}
                                        >
                                            {firstName}
                                        </text>
                                    </g>
                                );
                            })}

                            <circle
                                cx="300"
                                cy="300"
                                r="60"
                                fill="#ffffff"
                                stroke="#444"
                                strokeWidth="5"
                            />
                            <text
                                x="300"
                                y="315"
                                fontSize="40"
                                fontWeight="bold"
                                textAnchor="middle"
                                fill="#444"
                            >
                                🎯
                            </text>
                        </svg>
                    </div>
                </div>

                <button
                    onClick={spinWheel}
                    disabled={spinning || eligibleParticipants.length === 0}
                    className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-xl shadow-lg disabled:bg-gray-400 transition-all transform hover:scale-105 disabled:transform-none flex items-center space-x-2"
                >
                    {spinning ? (
                        <>
                            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>SPINNING...</span>
                        </>
                    ) : (
                        <span>SPIN THE WHEEL! 🎰</span>
                    )}
                </button>
            </div>

            {showModal && winner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 winner-modal-fade">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute winner-confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `-10%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    animationDuration: `${3 + Math.random() * 2}s`,
                                }}
                            >
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd'][Math.floor(Math.random() * 5)]
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 rounded-3xl shadow-2xl max-w-4xl w-full mx-8 overflow-hidden winner-modal-scale">
                        <div className="absolute inset-0 border-8 border-yellow-500 rounded-3xl animate-pulse"></div>
                        
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 bg-white hover:bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all transform hover:scale-110 z-10"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="relative p-12 text-center space-y-8">
                            <div className="text-9xl animate-bounce">
                                🏆
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-7xl font-black text-white drop-shadow-2xl animate-pulse">
                                    🎉 WINNER! 🎉
                                </h2>
                                <p className="text-3xl font-bold text-yellow-900">
                                    Congratulations!
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-2xl winner-flash-border">
                                <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600 winner-gradient-text">
                                    {winner.attendee_name}
                                </p>
                            </div>

                            <div className="bg-white bg-opacity-90 rounded-xl p-6 space-y-3">
                                {winner.email && (
                                    <p className="text-2xl text-gray-700 font-semibold">
                                        📧 {winner.email}
                                    </p>
                                )}
                                {winner.contact_number && (
                                    <p className="text-2xl text-gray-700 font-semibold">
                                        📱 {winner.contact_number}
                                    </p>
                                )}
                            </div>

                            <div className="text-4xl font-bold text-white drop-shadow-lg">
                                🎁 Grand Prize Winner! 🎁
                            </div>

                            <button
                                onClick={closeModal}
                                className="mt-8 px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-2xl font-bold rounded-xl shadow-lg transition-all transform hover:scale-105"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RouletteWheel;