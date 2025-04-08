import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
    throw new Error("API URL is not defined! Check your .env.local file.");
}

export const login = async (identifier: string, password: string) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, {
            identifier,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const getUserById = async (token: string, shortId: string) => {
    try {
        const response = await axios.get(`${apiUrl}/auth/getUserById`, {
            headers: { "x-access-token": token },
            params: { shortId }
        });
        console.log('Server response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};

export const singup = async (username: string, email: string, password: string) => {
    try {
        const respone = await axios.post(`${apiUrl}/auth/signup`, {username, email, password});
        return respone.data;
    } catch (error) {
        console.error("Error sing up", error);
        throw error;
    }
};
