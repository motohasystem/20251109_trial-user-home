import { getToken } from './auth';
import { UserProfile } from '../types';

// APIのベースURL（環境変数から取得、デフォルトはローカル）
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

/**
 * API共通ヘッダーを取得
 */
const getHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * ユーザープロフィールを取得
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

/**
 * ニックネームを更新
 */
export const updateNickname = async (userId: string, nickname: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/nickname`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ nickname }),
  });

  if (!response.ok) {
    throw new Error('Failed to update nickname');
  }
};

/**
 * 最寄りの避難所を更新
 */
export const updateShelter = async (userId: string, shelter: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/shelter`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ shelter }),
  });

  if (!response.ok) {
    throw new Error('Failed to update shelter');
  }
};

/**
 * 性格診断結果を保存
 */
export const savePersonalityResult = async (
  userId: string,
  result: any
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/personality`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error('Failed to save personality result');
  }
};

/**
 * パッカーン結果を保存
 */
export const savePakkaanResult = async (userId: string, result: any): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/pakkaan`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error('Failed to save pakkaan result');
  }
};
