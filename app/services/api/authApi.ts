import axios from "axios";
import {
  AuthResponse,
  LoginResponse,
  User,
  OtpVerifyResponse,
  ResetPasswordResponse,
  UserProfile,
  // UpdateProfileResponse,
} from "../../types/auth";

const base = process.env.NEXT_PUBLIC_API_URL;
export const api = axios.create({ baseURL: base });

if (!base) {
  throw new Error("API URL is not defined! Check your .env.local file.");
}

/** POST /user/login */
export const loginApi = (credentials: {
  identifier: string;
  password: string;
}): Promise<LoginResponse> =>
  api.post<LoginResponse>(`/user/login`, credentials).then(r => r.data);

/** POST /user/signup */
export const signupApi = (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> =>
  api.post<AuthResponse>(`/user/signup`, userData).then(r => r.data);

/** GET /user/:id */
export const fetchUserByIdApi = (id: string): Promise<User> =>
  api
    .get<User>(`/user/${id}`)
    .then(r => r.data);

/** GET /user/account/ */
export const fetchUserAccountApi = (token: string, userId: string): Promise<UserProfile> =>
  api
    .get<UserProfile>(`/user/account/${userId}`, {
      headers: { "x-access-token": token },
    })
    .then(r => r.data);

/** PUT /user/edit/:userId */
export const editUserApi = (
  token: string,
  userId: string,
  userData: Partial<UserProfile>
): Promise<{ success: boolean; message: string }> =>
  api
    .put<{ success: boolean; message: string }>(
      `/user/edit/${userId}`,
      userData,
      { headers: { "x-access-token": token } }
    )
    .then(r => r.data);

/** POST /user/verify-otp */
export const verifyOtpApi = (data: {
  email: string;
  otpToken: string;
  emailOnly?: boolean;
}): Promise<OtpVerifyResponse> =>
  api
    .post<OtpVerifyResponse>(`/user/verify-otp`, data)
    .then(r => r.data);

/** POST /user/resend-otp/:userId */
export const resendOtpApi = (
  userId: string,
  data: { email: string }
): Promise<{ success: boolean; message: string }> =>
  api
    .post<{ success: boolean; message: string }>(
      `/user/resend-otp/${userId}`,
      data
    )
    .then(r => r.data);

/** GET /user/profile */
export const getUserProfileApi = (token: string): Promise<User> =>
  api
    .get<User>(`/user/profile`, {
      headers: { "x-access-token": token },
    })
    .then(r => r.data);

/** PUT /user/profile */
// BE - API does not support partial updates
// export const updateProfileApi = (
//   token: string,
//   profileData: Partial<User>
// ): Promise<UpdateProfileResponse> =>
//   axios
//     .put<UpdateProfileResponse>(`/user/profile`, profileData, {
//       headers: { "x-access-token": token },
//     })
//     .then(r => r.data);

/** POST /user/change-password */
export const changePasswordApi = (
  token: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> =>
  api
    .post<{ success: boolean; message: string }>(
      `/user/change-password`,
      { currentPassword, newPassword },
      { headers: { "x-access-token": token } }
    )
    .then(r => r.data);

/** POST /user/request-password-reset */
export const requestPasswordResetApi = (data: {
  email: string;
}): Promise<{ success: boolean; message: string }> =>
  api
    .post<{ success: boolean; message: string }>(
      `/user/request-password-reset`,
      data
    )
    .then(r => r.data);

/** POST /user/reset-password */
export const resetPasswordApi = (newPassword: string): Promise<ResetPasswordResponse> =>
  api.post<ResetPasswordResponse>(`/user/reset-password`, { newPassword }).then(r => r.data);


/* ---- REFRESH TOKEN ---- */

api.interceptors.request.use(config => {
  try {
    const token = localStorage.getItem("accessToken");
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Failed to retrieve access token:", error);
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          subscribeTokenRefresh(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest.retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const response = await api.post("/user/refresh-tokens", {
          refreshToken: refreshToken,
        });
        
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        onRefreshed(newAccessToken);
        
        return api(originalRequest);
      } catch (e) {
        console.error("Failed to refresh token:", e);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);