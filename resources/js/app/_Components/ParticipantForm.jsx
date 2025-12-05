import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerParticipant } from '../redux/raffle-thunk';
import { clearRegistrationSuccess } from '../redux/raffle-slice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

// Validation Schema
const schema = yup.object({
    attendee_name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must not exceed 100 characters'),
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    contact_number: yup.string()
        .required('Contact number is required')
        .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
        .min(10, 'Phone number must be at least 10 digits'),
}).required();

const ParticipantForm = ({ onRegister }) => {
    const dispatch = useDispatch();
    const { loading, error, registrationSuccess } = useSelector((state) => state.raffle);
    
    const [qrCode, setQrCode] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        reset 
    } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (registrationSuccess) {
            // Reset form fields
            reset();
            setQrCode(null);
            
            // Call parent callback if provided
            if (onRegister) {
                onRegister(true);
            }
        }
    }, [registrationSuccess, onRegister, reset]);

    const onSubmit = async (data) => {
        setFormLoading(true);
        const loadingToast = toast.loading('Registering participant...');

        try {
            const response = await axios.post('/api/participants', data);
            
            setQrCode(response.data.qr_code);
            toast.success('✅ Participant registered successfully!', {
                id: loadingToast,
            });
            
            reset();
            
            if (onRegister) {
                onRegister(response.data.participant);
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to register participant';
            toast.error(`❌ ${errorMessage}`, {
                id: loadingToast,
            });
        } finally {
            setFormLoading(false);
        }
    };

    const downloadQRCode = () => {
        if (!qrCode) return;
        
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = 'raffle-ticket.png';
        link.click();
        toast.success('QR Code downloaded!');
    };

    const printQRCode = () => {
        if (!qrCode) return;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Raffle Ticket</title>
                    <style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                            font-family: Arial, sans-serif;
                        }
                        .ticket {
                            text-align: center;
                            padding: 20px;
                            border: 2px dashed #333;
                        }
                        h1 { color: #333; margin-bottom: 20px; }
                        img { max-width: 300px; }
                    </style>
                </head>
                <body>
                    <div class="ticket">
                        <h1>🎟️ Raffle Ticket</h1>
                        <img src="${qrCode}" alt="QR Code" />
                        <p>Scan this code at the event</p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        toast.success('Print dialog opened!');
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register('attendee_name')}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.attendee_name 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="Enter full name"
                        disabled={formLoading}
                    />
                    {errors.attendee_name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.attendee_name.message}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        {...register('email')}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.email 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="example@email.com"
                        disabled={formLoading}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Contact Number Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        {...register('contact_number')}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.contact_number 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                        }`}
                        placeholder="+63 912 345 6789"
                        disabled={formLoading}
                    />
                    {errors.contact_number && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.contact_number.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                    {formLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Registering...</span>
                        </>
                    ) : (
                        <span>✨ Register Participant</span>
                    )}
                </button>
            </form>

            {/* QR Code Display */}
            {qrCode && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-green-700 font-bold text-lg">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Registration Successful!</span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg inline-block">
                        <img src={qrCode} alt="QR Code" className="w-48 h-48 mx-auto" />
                    </div>
                    
                    <p className="text-gray-600 text-sm">Scan this QR code to check-in at the event</p>
                    
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={downloadQRCode}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-all transform hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Download</span>
                        </button>
                        <button
                            onClick={printQRCode}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-all transform hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            <span>Print</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParticipantForm;