/**
 * ホーム画面（ユーザープロフィール画面）
 */

import { navigateTo } from '../router.js';
import { getUserIdFromToken } from '../utils/auth.js';
import { fetchUserProfile, updateNickname } from '../utils/api.js';

let currentProfile = null;
let isEditingNickname = false;

/**
 * ホーム画面を描画
 */
export async function renderHome() {
  const app = document.getElementById('app');

  // プロフィールを読み込み
  await loadProfile();

  if (!currentProfile) {
    app.innerHTML = `
      <div class="error-message">
        プロフィールの読み込みに失敗しました
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="user-profile-screen">
      <header class="profile-header">
        <h1>ここパカ診断</h1>
        <p class="subtitle">ユーザーホーム画面</p>
      </header>

      <main class="profile-content">
        <!-- ニックネーム -->
        <section class="profile-section">
          <h2 class="section-title">ニックネーム</h2>
          <div class="section-content" id="nickname-section">
            ${renderNicknameSection()}
          </div>
        </section>

        <!-- 最寄りの避難所 -->
        <section class="profile-section clickable" id="shelter-section">
          <h2 class="section-title">最寄りの避難所</h2>
          <div class="section-content">
            <p class="shelter-name">
              ${currentProfile.nearestShelter || '未設定'}
            </p>
            <span class="nav-arrow">→</span>
          </div>
        </section>

        <!-- 性格診断結果 -->
        <section class="profile-section clickable" id="personality-section">
          <h2 class="section-title">性格診断結果</h2>
          <div class="section-content">
            ${renderPersonalityResult()}
            <span class="nav-arrow">→</span>
          </div>
        </section>

        <!-- パッカーン結果 -->
        <section class="profile-section clickable" id="pakkaan-section">
          <h2 class="section-title">パッカーン結果</h2>
          <div class="section-content">
            ${renderPakkaanResult()}
            <span class="nav-arrow">→</span>
          </div>
        </section>
      </main>
    </div>
  `;

  attachEventListeners();
}

/**
 * プロフィールを読み込み
 */
async function loadProfile() {
  try {
    const userId = getUserIdFromToken();
    if (userId) {
      currentProfile = await fetchUserProfile(userId);
    }
  } catch (error) {
    // APIエラー時はデモデータを使用
    console.warn('API unavailable, using demo data:', error);
    currentProfile = {
      nickname: 'ゲストユーザー',
      nearestShelter: null,
      personalityResult: null,
      pakkaanResult: null,
    };
  }
}

/**
 * ニックネームセクションを描画
 */
function renderNicknameSection() {
  if (isEditingNickname) {
    return `
      <div class="nickname-edit">
        <input
          type="text"
          id="nickname-input"
          value="${currentProfile.nickname}"
          class="nickname-input"
        />
        <div class="nickname-actions">
          <button class="btn btn-primary" id="save-nickname-btn">
            保存
          </button>
          <button class="btn btn-secondary" id="cancel-nickname-btn">
            キャンセル
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="nickname-display">
      <p class="nickname">${currentProfile.nickname}</p>
      <button class="btn btn-edit" id="edit-nickname-btn">
        編集
      </button>
    </div>
  `;
}

/**
 * 性格診断結果を描画
 */
function renderPersonalityResult() {
  if (!currentProfile.personalityResult) {
    return '<p class="not-set">未診断</p>';
  }

  const result = currentProfile.personalityResult;
  return `
    <div class="personality-result">
      <h3 class="personality-type">${result.type}</h3>
      <p class="personality-description">${result.description}</p>
    </div>
  `;
}

/**
 * パッカーン結果を描画
 */
function renderPakkaanResult() {
  if (!currentProfile.pakkaanResult) {
    return '<p class="not-set">未診断</p>';
  }

  const result = currentProfile.pakkaanResult;
  return `
    <div class="pakkaan-result">
      <div class="pakkaan-header">
        <span class="pakkaan-level">レベル ${result.level}</span>
        <h3 class="pakkaan-type">${result.type}</h3>
      </div>
      <div class="pakkaan-score">
        <div class="score-value">${result.score}</div>
      </div>
    </div>
  `;
}

/**
 * イベントリスナーをアタッチ
 */
function attachEventListeners() {
  // 避難所セクション
  const shelterSection = document.getElementById('shelter-section');
  if (shelterSection) {
    shelterSection.addEventListener('click', () => navigateTo('/shelter'));
  }

  // 性格診断セクション
  const personalitySection = document.getElementById('personality-section');
  if (personalitySection) {
    personalitySection.addEventListener('click', () => navigateTo('/personality'));
  }

  // パッカーンセクション
  const pakkaanSection = document.getElementById('pakkaan-section');
  if (pakkaanSection) {
    pakkaanSection.addEventListener('click', () => navigateTo('/pakkaan'));
  }

  // ニックネーム編集
  if (isEditingNickname) {
    const saveBtn = document.getElementById('save-nickname-btn');
    const cancelBtn = document.getElementById('cancel-nickname-btn');

    if (saveBtn) {
      saveBtn.addEventListener('click', handleNicknameSave);
    }
    if (cancelBtn) {
      cancelBtn.addEventListener('click', handleNicknameCancel);
    }
  } else {
    const editBtn = document.getElementById('edit-nickname-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        isEditingNickname = true;
        renderHome();
      });
    }
  }
}

/**
 * ニックネーム保存処理
 */
async function handleNicknameSave() {
  const input = document.getElementById('nickname-input');
  const newNickname = input.value.trim();

  if (!newNickname) {
    alert('ニックネームを入力してください');
    return;
  }

  const userId = getUserIdFromToken();
  if (!userId) {
    alert('ユーザー情報が取得できませんでした');
    return;
  }

  try {
    await updateNickname(userId, newNickname);
    currentProfile.nickname = newNickname;
    isEditingNickname = false;
    renderHome();
  } catch (error) {
    console.error('Failed to update nickname:', error);
    // APIエラーでもローカルで更新
    currentProfile.nickname = newNickname;
    isEditingNickname = false;
    renderHome();
  }
}

/**
 * ニックネーム編集キャンセル
 */
function handleNicknameCancel() {
  isEditingNickname = false;
  renderHome();
}
