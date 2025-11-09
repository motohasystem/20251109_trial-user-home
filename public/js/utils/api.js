/**
 * API通信ユーティリティ
 */

import { getToken } from './auth.js';

// APIのベースURL（環境変数がない場合はローカル）
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * API共通ヘッダーを取得
 */
function getHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * ユーザープロフィールを取得
 */
export async function fetchUserProfile(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}

/**
 * ニックネームを更新
 */
export async function updateNickname(userId, nickname) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/nickname`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ nickname }),
  });

  if (!response.ok) {
    throw new Error('Failed to update nickname');
  }
}

/**
 * 最寄りの避難所を更新
 */
export async function updateShelter(userId, shelter) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/shelter`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ shelter }),
  });

  if (!response.ok) {
    throw new Error('Failed to update shelter');
  }
}

/**
 * 性格診断結果を保存
 */
export async function savePersonalityResult(userId, result) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/personality`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error('Failed to save personality result');
  }
}

/**
 * パッカーン結果を保存
 */
export async function savePakkaanResult(userId, result) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/pakkaan`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    throw new Error('Failed to save pakkaan result');
  }
}
