export const TOKEN_KEY = 'admin_access_token';

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return false;
    // Buffer of 10 seconds
    return payload.exp * 1000 < Date.now() - 10000;
  } catch (e) {
    return true;
  }
};

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) return false;
  return !isTokenExpired(token);
};
