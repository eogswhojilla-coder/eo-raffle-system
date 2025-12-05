import axios from 'axios';

const API_BASE_URL = '/api';

const raffleService = {
    // Raffle endpoints
    getAllRaffles: async () => {
        const response = await axios.get(`${API_BASE_URL}/raffles`);
        return response.data;
    },

    getRaffle: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/raffles/${id}`);
        return response.data;
    },

    createRaffle: async (raffleData) => {
        const response = await axios.post(`${API_BASE_URL}/raffles`, raffleData);
        return response.data;
    },

    updateRaffle: async (id, raffleData) => {
        const response = await axios.put(`${API_BASE_URL}/raffles/${id}`, raffleData);
        return response.data;
    },

    deleteRaffle: async (id) => {
        const response = await axios.delete(`${API_BASE_URL}/raffles/${id}`);
        return response.data;
    },

    // Participant endpoints
    getAllParticipants: async () => {
        const response = await axios.get(`${API_BASE_URL}/participants`);
        return response.data;
    },

    getParticipant: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/participants/${id}`);
        return response.data;
    },

    registerParticipant: async (participantData) => {
        const response = await axios.post(`${API_BASE_URL}/participants`, participantData);
        return response.data;
    },

    scanQRCode: async (qrData) => {
        const response = await axios.post(`${API_BASE_URL}/participants/scan`, qrData);
        return response.data;
    },

    getRaffleParticipants: async (raffleId) => {
        const response = await axios.get(`${API_BASE_URL}/raffles/${raffleId}/participants`);
        return response.data;
    },

    // Winner endpoints
    getAllWinners: async () => {
        const response = await axios.get(`${API_BASE_URL}/winners`);
        return response.data;
    },

    selectWinner: async (winnerData) => {
        const response = await axios.post(`${API_BASE_URL}/winners`, winnerData);
        return response.data;
    },

    getRaffleWinners: async (raffleId) => {
        const response = await axios.get(`${API_BASE_URL}/raffles/${raffleId}/winners`);
        return response.data;
    },
};

export default raffleService;
