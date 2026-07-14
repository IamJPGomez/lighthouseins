import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

const TOKEN_KEY = "lh_admin_token";

// Admin JWT is kept in sessionStorage (cleared when the tab closes) rather than
// localStorage, reducing exposure. For maximum security an httpOnly cookie +
// server-side session would be used; that is a larger backend change tracked
// separately.
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (t) => sessionStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

export const authHeaders = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};
