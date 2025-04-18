/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(
  (config) => {
    const auth: any =
      typeof window !== "undefined"
        ? localStorage.getItem("persist:auth")
        : null;

    const token = JSON.parse(auth)?.token;
    const parsedToken = JSON.parse(token);

    if (parsedToken) {
      config.headers.Authorization = `Bearer ${parsedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       store.getState().auth.refreshToken
//     ) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = store.getState().auth.refreshToken;
//         const { data } = await axios.post("https://api.example.com/refresh", {
//           refreshToken,
//         });

//         // // Update Token in Redux Store
//         // store.dispatch(setToken(data.accessToken));

//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         return API(originalRequest);
//       } catch (refreshError) {
//         console.log(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
