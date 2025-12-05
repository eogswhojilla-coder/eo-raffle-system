import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipants, scanQRCode } from '../../redux/raffle-thunk';
import HeaderSection from './sections/header-section';
import RegistrationFormSection from './sections/registration-form-section';
import QRScannerSection from './sections/qr-scanner-section';
import ParticipantsListSection from './sections/participants-list-section';

const Page = () => {
    const dispatch = useDispatch();
    const { participants, loading } = useSelector((state) => state.raffle);

    useEffect(() => {
        dispatch(fetchParticipants());
    }, [dispatch]);

    const handleRegistrationSuccess = () => {
        // Refresh participants list after successful registration
        dispatch(fetchParticipants());
    };

    const handleQRScanSuccess = async (decodedText) => {
        try {
            await dispatch(scanQRCode({ qr_code_data: decodedText })).unwrap();
            // Refresh participants list after successful scan
            dispatch(fetchParticipants());
        } catch (error) {
            console.error('QR Scan error:', error);
            alert('Failed to register participant. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header Section */}
            <HeaderSection />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Registration Form Section */}
                    <RegistrationFormSection onRegisterSuccess={handleRegistrationSuccess} />

                    {/* QR Scanner Section */}
                    <QRScannerSection onScanSuccess={handleQRScanSuccess} />
                </div>

                {/* Participants List Section */}
                <ParticipantsListSection participants={participants} loading={loading} />
            </div>
        </div>
    );
};

export default Page;