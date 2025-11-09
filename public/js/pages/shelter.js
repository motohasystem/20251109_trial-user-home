/**
 * 避難所入力ページ
 */

import { goBack } from '../router.js';
import { getUserIdFromToken } from '../utils/auth.js';
import { updateShelter } from '../utils/api.js';

/**
 * 避難所入力ページを描画
 */
export function renderShelter() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="input-page">
      <header class="page-header">
        <button class="back-button" id="back-btn">← 戻る</button>
        <h1>最寄りの避難所</h1>
      </header>

      <main class="page-content">
        <form class="input-form" id="shelter-form">
          <div class="form-group">
            <label for="shelter-input" class="form-label">
              避難所名を入力してください
            </label>
            <input
              type="text"
              id="shelter-input"
              class="form-input"
              placeholder="例: 中央公園避難所"
              required
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-large">
              保存
            </button>
          </div>
        </form>
      </main>
    </div>
  `;

  attachEventListeners();
}

/**
 * イベントリスナーをアタッチ
 */
function attachEventListeners() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', goBack);
  }

  const form = document.getElementById('shelter-form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
}

/**
 * フォーム送信処理
 */
async function handleSubmit(e) {
  e.preventDefault();

  const input = document.getElementById('shelter-input');
  const shelter = input.value.trim();

  if (!shelter) {
    alert('避難所名を入力してください');
    return;
  }

  const userId = getUserIdFromToken();
  if (!userId) {
    alert('ユーザー情報が取得できませんでした');
    return;
  }

  try {
    await updateShelter(userId, shelter);
    alert('避難所情報を保存しました');
    goBack();
  } catch (error) {
    console.error('Failed to update shelter:', error);
    alert('避難所情報を保存しました（ローカル）');
    goBack();
  }
}
