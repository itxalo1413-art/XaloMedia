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

export const isAuthenticated = () => {
  const token = getAccessToken();
  if (!token) return false;
  // basic check: could expand to decode jwt and check expiration
  return true;
};
