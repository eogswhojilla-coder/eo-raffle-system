import React from 'react';

const ParticipantsListSection = ({ participants, loading }) => {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Recent Registrations</h2>
                </div>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
                    {participants.length} Total
                </span>
            </div>

            <div className="overflow-y-auto max-h-[600px] space-y-3">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading participants...</p>
                    </div>
                ) : participants.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-3">👥</div>
                        <p className="text-gray-500">No participants yet</p>
                        <p className="text-gray-400 text-sm mt-1">Start registering participants to see them here</p>
                    </div>
                ) : (
                    participants.slice(0, 10).map((participant, index) => (
                        <div 
                            key={participant.id || index}
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 rounded-lg hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="bg-blue-400 text-white text-xs font-bold px-2 py-1 rounded">
                                            #{participants.length - index}
                                        </span>
                                        <p className="font-bold text-gray-800">
                                            {participant.attendee_name}
                                        </p>
                                    </div>
                                    {participant.email && (
                                        <p className="text-sm text-gray-600 mb-1">
                                            📧 {participant.email}
                                        </p>
                                    )}
                                    {participant.contact_number && (
                                        <p className="text-sm text-gray-600 mb-1">
                                            📱 {participant.contact_number}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 mt-2">
                                        🕒 {new Date(participant.scanned_at || participant.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-2xl">
                                    {participant.is_winner ? '🏆' : '✅'}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ParticipantsListSection;