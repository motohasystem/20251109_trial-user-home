/**
 * パッカーン診断ページ
 */

import { goBack } from '../router.js';
import { getUserIdFromToken } from '../utils/auth.js';
import { savePakkaanResult } from '../utils/api.js';

const questions = [
  '非常用の水や食料を備蓄していますか？',
  '避難経路を確認していますか？',
  '防災グッズを準備していますか？',
  '家族との連絡方法を決めていますか？',
  '定期的に防災訓練に参加していますか？',
];

let currentQuestion = 0;
let answers = [];

/**
 * パッカーン診断ページを描画
 */
export function renderPakkaan() {
  currentQuestion = 0;
  answers = [];

  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="input-page">
      <header class="page-header">
        <button class="back-button" id="back-btn">← 戻る</button>
        <h1>パッカーン診断</h1>
      </header>

      <main class="page-content">
        <div class="test-container">
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>

          <div class="question-card" id="question-card">
            ${renderQuestion()}
          </div>
        </div>
      </main>
    </div>
  `;

  attachEventListeners();
  updateProgress();
}

/**
 * 質問を描画
 */
function renderQuestion() {
  return `
    <p class="question-number">
      質問 ${currentQuestion + 1} / ${questions.length}
    </p>
    <h2 class="question-text">${questions[currentQuestion]}</h2>

    <div class="answer-buttons">
      <button class="answer-btn" data-score="1">全くしていない</button>
      <button class="answer-btn" data-score="2">あまりしていない</button>
      <button class="answer-btn" data-score="3">普通</button>
      <button class="answer-btn" data-score="4">よくしている</button>
      <button class="answer-btn" data-score="5">完璧にしている</button>
    </div>
  `;
}

/**
 * 進捗バーを更新
 */
function updateProgress() {
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
  }
}

/**
 * イベントリスナーをアタッチ
 */
function attachEventListeners() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', goBack);
  }

  const answerBtns = document.querySelectorAll('.answer-btn');
  answerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const score = parseInt(btn.dataset.score);
      handleAnswer(score);
    });
  });
}

/**
 * 回答処理
 */
function handleAnswer(score) {
  answers.push(score);

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    const questionCard = document.getElementById('question-card');
    if (questionCard) {
      questionCard.innerHTML = renderQuestion();
      attachEventListeners();
      updateProgress();
    }
  } else {
    calculateResult();
  }
}

/**
 * 診断結果を計算して保存
 */
async function calculateResult() {
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = questions.length * 5;
  const normalizedScore = Math.round((totalScore / maxScore) * 100);

  let level = 1;
  let type = '';
  let comment = '';

  if (normalizedScore >= 90) {
    level = 5;
    type = 'スーパーパッカーン';
    comment = '素晴らしい防災意識です！日頃の備えが完璧です。';
  } else if (normalizedScore >= 70) {
    level = 4;
    type = 'ハイパッカーン';
    comment = 'とても良い防災意識です。もう少しで完璧です！';
  } else if (normalizedScore >= 50) {
    level = 3;
    type = 'パッカーン';
    comment = '防災意識は良好です。さらなる備えをお勧めします。';
  } else if (normalizedScore >= 30) {
    level = 2;
    type = 'プチパッカーン';
    comment = '防災意識を高めましょう。少しずつ準備を始めましょう。';
  } else {
    level = 1;
    type = 'ビギナー';
    comment = '今日から防災の準備を始めましょう！';
  }

  const result = {
    level,
    type,
    score: normalizedScore,
    comment,
  };

  const userId = getUserIdFromToken();
  if (userId) {
    try {
      await savePakkaanResult(userId, result);
    } catch (error) {
      console.error('Failed to save pakkaan result:', error);
    }
  }

  alert('パッカーン診断結果を保存しました');
  goBack();
}
