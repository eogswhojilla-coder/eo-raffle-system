import { createAsyncThunk } from '@reduxjs/toolkit';
import raffleService from '../services/raffle-service';

// Raffle thunks
export const fetchRaffles = createAsyncThunk(
    'raffle/fetchRaffles',
    async (_, { rejectWithValue }) => {
        try {
            const data = await raffleService.getAllRaffles();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch raffles');
        }
    }
);

export const fetchRaffleById = createAsyncThunk(
    'raffle/fetchRaffleById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await raffleService.getRaffle(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch raffle');
        }
    }
);

export const createRaffle = createAsyncThunk(
    'raffle/createRaffle',
    async (raffleData, { rejectWithValue }) => {
        try {
            const data = await raffleService.createRaffle(raffleData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create raffle');
        }
    }
);

// Participant thunks
export const fetchParticipants = createAsyncThunk(
    'raffle/fetchParticipants',
    async (_, { rejectWithValue }) => {
        try {
            const data = await raffleService.getAllParticipants();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch participants');
        }
    }
);

export const registerParticipant = createAsyncThunk(
    'raffle/registerParticipant',
    async (participantData, { rejectWithValue }) => {
        try {
            const data = await raffleService.registerParticipant(participantData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to register participant');
        }
    }
);

export const scanQRCode = createAsyncThunk(
    'raffle/scanQRCode',
    async (qrData, { rejectWithValue }) => {
        try {
            const data = await raffleService.scanQRCode(qrData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to scan QR code');
        }
    }
);

// Winner thunks
export const fetchWinners = createAsyncThunk(
    'raffle/fetchWinners',
    async (_, { rejectWithValue }) => {
        try {
            const data = await raffleService.getAllWinners();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch winners');
        }
    }
);

export const selectWinner = createAsyncThunk(
    'raffle/selectWinner',
    async (winnerData, { rejectWithValue }) => {
        try {
            const data = await raffleService.selectWinner(winnerData);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to select winner');
        }
    }
);
