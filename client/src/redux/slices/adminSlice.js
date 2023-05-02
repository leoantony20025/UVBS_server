import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        videos: [],
        audios: [],
        products: [],
        orders: []

    },
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload;
        },
        getVideos: (state, action) => {
            state.videos = action.payload
        },
        getAudios: (state, action) => {
            state.audios = action.payload
        },
        getProducts: (state, action) => {
            state.products = action.payload
        },
        getOrders: (state, action) => {
            state.orders = action.payload
        }
    },
});

export const { getAudios, getOrders, getProducts, getUsers, getVideos } = slice.actions

export default slice.reducer