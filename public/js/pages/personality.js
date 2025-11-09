/**
 * 性格診断ページ
 */

import { goBack } from '../router.js';
import { getUserIdFromToken } from '../utils/auth.js';
import { savePersonalityResult } from '../utils/api.js';

const questions = [
  '緊急時でも冷静に対応できる',
  '周りの人を助けることが好きだ',
  '計画を立てて行動することが得意だ',
  'リーダーシップを取ることが多い',
  '新しい環境にもすぐに適応できる',
];

let currentQuestion = 0;
let answers = [];

/**
 * 性格診断ページを描画
 */
export function renderPersonality() {
  currentQuestion = 0;
  answers = [];

  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="input-page">
      <header class="page-header">
        <button class="back-button" id="back-btn">← 戻る</button>
        <h1>性格診断</h1>
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
      <button class="answer-btn" data-score="1">全くそう思わない</button>
      <button class="answer-btn" data-score="2">あまりそう思わない</button>
      <button class="answer-btn" data-score="3">どちらでもない</button>
      <button class="answer-btn" data-score="4">ややそう思う</button>
      <button class="answer-btn" data-score="5">とてもそう思う</button>
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
  const averageScore = totalScore / answers.length;

  let personalityType = '';
  let description = '';
  let traits = [];

  if (averageScore >= 4) {
    personalityType = '冷静沈着タイプ';
    description = '緊急時でも落ち着いて行動できる性格です。';
    traits = ['冷静な判断力', 'リーダーシップ', '周りを助ける優しさ'];
  } else if (averageScore >= 3) {
    personalityType = 'バランス型';
    description = '状況に応じて柔軟に対応できる性格です。';
    traits = ['適応力', '協調性', '思慮深さ'];
  } else {
    personalityType = 'サポート型';
    description = 'チームで協力して行動することが得意な性格です。';
    traits = ['協力性', '共感力', '丁寧さ'];
  }

  const result = {
    type: personalityType,
    description,
    traits,
    score: totalScore,
  };

  const userId = getUserIdFromToken();
  if (userId) {
    try {
      await savePersonalityResult(userId, result);
    } catch (error) {
      console.error('Failed to save personality result:', error);
    }
  }

  alert('性格診断結果を保存しました');
  goBack();
}
