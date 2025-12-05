import { createSlice } from '@reduxjs/toolkit';
import {
    fetchRaffles,
    fetchRaffleById,
    createRaffle,
    fetchParticipants,
    registerParticipant,
    scanQRCode,
    fetchWinners,
    selectWinner,
} from './raffle-thunk';

const initialState = {
    raffles: [],
    currentRaffle: null,
    participants: [],
    winners: [],
    loading: false,
    error: null,
    registrationSuccess: false,
    scanSuccess: null,
};

const raffleSlice = createSlice({
    name: 'raffle',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
        },
        clearScanSuccess: (state) => {
            state.scanSuccess = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch all raffles
        builder
            .addCase(fetchRaffles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRaffles.fulfilled, (state, action) => {
                state.loading = false;
                state.raffles = action.payload;
            })
            .addCase(fetchRaffles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch raffle by ID
        builder
            .addCase(fetchRaffleById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRaffleById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRaffle = action.payload;
            })
            .addCase(fetchRaffleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Create raffle
        builder
            .addCase(createRaffle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRaffle.fulfilled, (state, action) => {
                state.loading = false;
                state.raffles.push(action.payload.raffle);
            })
            .addCase(createRaffle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Fetch participants
        builder
            .addCase(fetchParticipants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchParticipants.fulfilled, (state, action) => {
                state.loading = false;
                state.participants = action.payload;
            })
            .addCase(fetchParticipants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Register participant
        builder
            .addCase(registerParticipant.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.registrationSuccess = false;
            })
            .addCase(registerParticipant.fulfilled, (state, action) => {
                state.loading = false;
                state.participants.unshift(action.payload.participant);
                state.registrationSuccess = true;
            })
            .addCase(registerParticipant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.registrationSuccess = false;
            });

        // Scan QR code
        builder
            .addCase(scanQRCode.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.scanSuccess = null;
            })
            .addCase(scanQRCode.fulfilled, (state, action) => {
                state.loading = false;
                state.participants.unshift(action.payload.participant);
                state.scanSuccess = { success: true, message: action.payload.message };
            })
            .addCase(scanQRCode.rejected, (state, action) => {
                state.loading = false;
                state.scanSuccess = { success: false, message: action.payload };
            });

        // Fetch winners
        builder
            .addCase(fetchWinners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWinners.fulfilled, (state, action) => {
                state.loading = false;
                state.winners = action.payload;
            })
            .addCase(fetchWinners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Select winner
        builder
            .addCase(selectWinner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(selectWinner.fulfilled, (state, action) => {
                state.loading = false;
                state.winners.unshift(action.payload.winner);
                // Remove winner from participants
                state.participants = state.participants.filter(
                    (p) => p.id !== action.payload.winner.winner_id
                );
            })
            .addCase(selectWinner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, clearRegistrationSuccess, clearScanSuccess } = raffleSlice.actions;
export default raffleSlice.reducer;
