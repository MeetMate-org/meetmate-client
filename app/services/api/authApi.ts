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
if (!base) {
  throw new Error("API URL is not defined! Check your .env.local file.");
}

/** POST /user/login */
export const loginApi = (credentials: {
  identifier: string;
  password: string;
}): Promise<LoginResponse> =>
  axios.post<LoginResponse>(`${base}/user/login`, credentials).then(r => r.data);

/** POST /user/signup */
export const signupApi = (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> =>
  axios.post<AuthResponse>(`${base}/user/signup`, userData).then(r => r.data);

/** GET /user/:id */
export const fetchUserByIdApi = (id: string): Promise<User> =>
  axios
    .get<User>(`${base}/user/${id}`)
    .then(r => r.data);

/** GET /user/account/ */
export const fetchUserAccountApi = (token: string, userId: string): Promise<UserProfile> =>
  axios
    .get<UserProfile>(`${base}/user/account/${userId}`, {
      headers: { "x-access-token": token },
    })
    .then(r => r.data);

/** PUT /user/edit/:userId */
export const editUserApi = (
  token: string,
  userId: string,
  userData: Partial<UserProfile>
): Promise<{ success: boolean; message: string }> =>
  axios
    .put<{ success: boolean; message: string }>(
      `${base}/user/edit/${userId}`,
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
  axios
    .post<OtpVerifyResponse>(`${base}/user/verify-otp`, data)
    .then(r => r.data);

/** POST /user/resend-otp/:userId */
export const resendOtpApi = (
  userId: string,
  data: { email: string }
): Promise<{ success: boolean; message: string }> =>
  axios
    .post<{ success: boolean; message: string }>(
      `${base}/user/resend-otp/${userId}`,
      data
    )
    .then(r => r.data);

/** GET /user/profile */
export const getUserProfileApi = (token: string): Promise<User> =>
  axios
    .get<User>(`${base}/user/profile`, {
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
//     .put<UpdateProfileResponse>(`${base}/user/profile`, profileData, {
//       headers: { "x-access-token": token },
//     })
//     .then(r => r.data);

/** POST /user/change-password */
export const changePasswordApi = (
  token: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> =>
  axios
    .post<{ success: boolean; message: string }>(
      `${base}/user/change-password`,
      { currentPassword, newPassword },
      { headers: { "x-access-token": token } }
    )
    .then(r => r.data);

/** POST /user/request-password-reset */
export const requestPasswordResetApi = (data: {
  email: string;
}): Promise<{ success: boolean; message: string }> =>
  axios
    .post<{ success: boolean; message: string }>(
      `${base}/user/request-password-reset`,
      data
    )
    .then(r => r.data);

/** POST /user/reset-password */
export const resetPasswordApi = (newPassword: string): Promise<ResetPasswordResponse> =>
  axios.post<ResetPasswordResponse>(`${base}/user/reset-password`, { newPassword }).then(r => r.data);
