/**
 * ハッシュベースのルーター
 */

const routes = {};
let currentRoute = null;

/**
 * ルートを登録
 */
export function registerRoute(path, handler) {
  routes[path] = handler;
}

/**
 * 指定のパスに遷移
 */
export function navigateTo(path) {
  window.location.hash = path;
}

/**
 * 現在のルートを取得
 */
function getCurrentRoute() {
  const hash = window.location.hash.slice(1); // #を除去
  return hash || '/';
}

/**
 * ルーティング処理
 */
async function handleRoute() {
  const route = getCurrentRoute();
  const handler = routes[route] || routes['/'];

  if (handler && handler !== currentRoute) {
    currentRoute = handler;
    await handler();
  }
}

/**
 * ルーターを初期化
 */
export function initRouter() {
  // ハッシュ変更時のイベントリスナー
  window.addEventListener('hashchange', handleRoute);

  // 初回読み込み時
  handleRoute();
}

/**
 * ホームに戻る
 */
export function goBack() {
  navigateTo('/');
}
