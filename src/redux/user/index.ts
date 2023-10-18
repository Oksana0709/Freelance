import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PAuth, PRegister, PUserGoogle, User, UserState } from './types';
import { BASE_URL } from '../../utils';
import { RootState } from '../store';

const initialState: UserState = {
    users: [],
    currentUser: {} as User,
};

export const fetchUsers = createAsyncThunk('user/fetch', async () => {
    const data = await axios.get(BASE_URL + '/user/all');
    return data.data;
});

export const fetchUser = createAsyncThunk('user/fetchById', async (id?: number) => {
    const token = localStorage.getItem('userId');

    const data = await axios.post(
        BASE_URL + '/user/by-id',
        { id },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return data.data;
});

export const authUsers = createAsyncThunk('user/auth', async (object: PAuth): Promise<User> => {
    const response = await axios.post(BASE_URL + '/user/auth', object);

    if (response?.data?.token) {
        localStorage.setItem('userId', String(response?.data?.token));
    }

    return response?.data;
});

export const registerUser = createAsyncThunk('user/register', async (object: PRegister) => {
    const data = await axios.post(BASE_URL + '/user/register', object);

    if (data?.data?.token) {
        localStorage.setItem('userId', String(data?.data?.token));
    }

    return data.data;
});

export const editUsers = createAsyncThunk('user/edit', async (object: User) => {
    const data = await axios.put(BASE_URL + '/user/edit', object);
    return data.data;
});

export const deleteUsers = createAsyncThunk('user/delete', async (id: number) => {
    const data = await axios.delete(BASE_URL + '/users' + '/' + id);
    return data.data;
});

export const authByGoogle = createAsyncThunk('user/oauth', async (userData: PUserGoogle) => {
    const response = await axios.post(BASE_URL + '/user/oauth', userData);

    if (response?.data?.id) {
        localStorage.setItem('userId', String(response?.data?.id));
    }

    return response.data;
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
            })
            .addCase(authUsers.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(editUsers.fulfilled, (state, action) => {
                state.users = state.users.map(user => {
                    if (user.id === action.payload.id) {
                        return action.payload;
                    }

                    return user;
                });
            })
            .addCase(deleteUsers.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload.id);
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(authByGoogle.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            });
    },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
