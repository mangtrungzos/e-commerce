import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from "../../model/Auth";
import { login as loginService } from '../../services/auth/authService';
import { register as registerService } from '../../services/auth/authService';

export const login = createAsyncThunk<ILoginResponse, ILogin>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await loginService(data);
            const userData = response.data;
            
            // if(response.data) {
            //     localStorage.setItem('user', JSON.stringify(response.data)); // Convert to string
            // }
            if(userData?.token) {
                localStorage.setItem("token", userData.token);
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                console.warn("No token received from API!");
            }
            
            console.log("Login successful:", {
                email: data.email,
                // password: data.password,
                token: userData.token
            });

            return response.data;
        }
        catch (error) {
            console.log("Error response: ", error);
            return rejectWithValue(error);
        }
    }
);

export const register = createAsyncThunk<IRegisterResponse, IRegister>(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            const response = await registerService(data);
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data)); // Convert to string
            }

            console.log("Register Successful", {
                email: data.email,
                password: data.password 
            });
            
            return response.data;
        }
        catch(error) {
            console.log("Error response: ", error);
            return rejectWithValue(error);
        }
    }
);