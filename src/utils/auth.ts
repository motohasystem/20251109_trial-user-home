import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  userId: string;
  exp: number;
  [key: string]: any;
}

/**
 * JWTトークンからユーザーIDを取得
 */
export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.userId;
  } catch (error) {
    console.error('JWT decode error:', error);
    return null;
  }
};

/**
 * JWTトークンを保存
 */
export const saveToken = (token: string): void => {
  localStorage.setItem('jwt_token', token);
};

/**
 * JWTトークンを削除
 */
export const removeToken = (): void => {
  localStorage.removeItem('jwt_token');
};

/**
 * JWTトークンを取得
 */
export const getToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

/**
 * JWTトークンの有効性を確認
 */
export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};
