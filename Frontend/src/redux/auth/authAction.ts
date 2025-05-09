import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, ILoginResponse, IRegister, IRegisterResponse, IOAuthUser, IOAuthResponse } from "../../model/Auth";
import { login as loginService } from '../../services/auth/authService';
import { logout as logoutService } from '../../services/auth/authService';
import { register as registerService } from '../../services/auth/authService';
import { oauthLogin as oauthLoginService } from '../../services/auth/authService';
import { AxiosError } from "axios";
import { removeToken, setToken, removeRefreshToken } from '../../auth/authToken';
import Cookies from "js-cookie";

const isAxiosError = (err: unknown): err is AxiosError<{ message: string }> => {
    return (err as AxiosError).isAxiosError !== undefined;
}

export const login = createAsyncThunk<ILoginResponse, ILogin>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await loginService(data);
            const userData = response.data;

            if (!userData) {
                return rejectWithValue({ message: "Invalid response data" });
            }
            
            if(userData.token) {
                setToken(userData.token);
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                console.warn("No token received from API!");
            }
            // console.log("Received token:", userData.token);
            
            console.log("Login successful:", {
                email: data.email,
                token: userData.token
            });

            return response.data;
        }
        catch (error) {
            const err = error as AxiosError<{ message: string }>;

            console.log("Error response: ", error);
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

export const logout = createAsyncThunk(
   'auth/logout',
   async (_, { rejectWithValue }) => {
        try {
            await logoutService();

            // Clear cookies
            localStorage.clear();
            removeToken();
            removeRefreshToken();
            return true;
        } catch (error) {
            if (isAxiosError(error)) {
                return rejectWithValue({
                    message: error.response?.data?.message || "Logout failed",
                    status: error.response?.status || 500
                });
            }
            return rejectWithValue({
                message: "Unknown error occurred during logout",
                status: 500
            });
        }
   } 
)

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

export const oauthLogin = createAsyncThunk<IOAuthResponse, IOAuthUser>(
    'auth/oauth/appwrite-login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await oauthLoginService(data);
            const userData = response.data;

            // Check and ensure that data is valid
            if (userData?.token && userData?.user) {
                setToken(userData.token);
                Cookies.set("user", JSON.stringify(userData.user));
            } else {
                return rejectWithValue({
                    message: "Invalid response data",
                    status: 400
                });
            }
            return userData;
        }
        catch (error) {
            if (isAxiosError(error)) {
                const simplifiedError = {
                    message: error.response?.data?.message || error.message || "Đã có lỗi xảy ra",
                    status: error.response?.status || 500,
                }
                return rejectWithValue(simplifiedError);
            }
            return rejectWithValue({
                message: "Uknown error occured",
                status: 500
            });
        }
    }
);

