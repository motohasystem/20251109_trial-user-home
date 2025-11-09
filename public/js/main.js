/**
 * メインエントリーポイント
 */

import { initRouter, registerRoute } from './router.js';
import { renderHome } from './pages/home.js';
import { renderShelter } from './pages/shelter.js';
import { renderPersonality } from './pages/personality.js';
import { renderPakkaan } from './pages/pakkaan.js';
import { getUserIdFromToken, saveToken, createDemoToken } from './utils/auth.js';

/**
 * アプリケーション初期化
 */
function initApp() {
  // JWTトークンがない場合はデモトークンを設定
  if (!getUserIdFromToken()) {
    const demoToken = createDemoToken();
    saveToken(demoToken);
  }

  // ルートを登録
  registerRoute('/', renderHome);
  registerRoute('/shelter', renderShelter);
  registerRoute('/personality', renderPersonality);
  registerRoute('/pakkaan', renderPakkaan);

  // ルーターを初期化
  initRouter();
}

// DOM読み込み完了後に初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
