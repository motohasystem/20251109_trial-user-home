/**
 * JWT認証ユーティリティ
 */

/**
 * Base64デコード（URL safe対応）
 */
function base64UrlDecode(str) {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }

  try {
    return decodeURIComponent(
      atob(output)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (err) {
    return atob(output);
  }
}

/**
 * JWTトークンをデコード
 */
function decodeJWT(token) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT');
  }

  const payload = base64UrlDecode(parts[1]);
  return JSON.parse(payload);
}

/**
 * JWTトークンからユーザーIDを取得
 */
export function getUserIdFromToken() {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    return null;
  }

  try {
    const decoded = decodeJWT(token);
    return decoded.userId;
  } catch (error) {
    console.error('JWT decode error:', error);
    return null;
  }
}

/**
 * JWTトークンを保存
 */
export function saveToken(token) {
  localStorage.setItem('jwt_token', token);
}

/**
 * JWTトークンを削除
 */
export function removeToken() {
  localStorage.removeItem('jwt_token');
}

/**
 * JWTトークンを取得
 */
export function getToken() {
  return localStorage.getItem('jwt_token');
}

/**
 * JWTトークンの有効性を確認
 */
export function isTokenValid() {
  const token = getToken();
  if (!token) {
    return false;
  }

  try {
    const decoded = decodeJWT(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

/**
 * デモ用のJWTトークンを生成
 */
export function createDemoToken() {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      userId: 'demo-user-123',
      exp: Math.floor(Date.now() / 1000) + 3600 * 24, // 24時間後
    })
  );
  const signature = 'demo-signature';
  return `${header}.${payload}.${signature}`;
}
