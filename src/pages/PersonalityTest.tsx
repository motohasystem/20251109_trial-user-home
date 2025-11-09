import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePersonalityResult } from '../utils/api';
import { getUserIdFromToken } from '../utils/auth';
import './InputPage.css';

/**
 * 性格診断ページ
 */
export const PersonalityTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // 簡易的な診断質問
  const questions = [
    '緊急時でも冷静に対応できる',
    '周りの人を助けることが好きだ',
    '計画を立てて行動することが得意だ',
    'リーダーシップを取ることが多い',
    '新しい環境にもすぐに適応できる',
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: number[]) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('ユーザー情報が取得できませんでした');
      return;
    }

    const totalScore = finalAnswers.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / finalAnswers.length;

    let personalityType = '';
    let description = '';
    let traits: string[] = [];

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

    setIsSaving(true);
    try {
      await savePersonalityResult(userId, result);
      alert('性格診断結果を保存しました');
      navigate('/');
    } catch (error) {
      console.error('Failed to save personality result:', error);
      alert('性格診断結果の保存に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="input-page">
      <header className="page-header">
        <button onClick={() => navigate('/')} className="back-button">
          ← 戻る
        </button>
        <h1>性格診断</h1>
      </header>

      <main className="page-content">
        <div className="test-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="question-card">
            <p className="question-number">
              質問 {currentQuestion + 1} / {questions.length}
            </p>
            <h2 className="question-text">{questions[currentQuestion]}</h2>

            <div className="answer-buttons">
              <button
                onClick={() => handleAnswer(1)}
                className="answer-btn"
                disabled={isSaving}
              >
                全くそう思わない
              </button>
              <button
                onClick={() => handleAnswer(2)}
                className="answer-btn"
                disabled={isSaving}
              >
                あまりそう思わない
              </button>
              <button
                onClick={() => handleAnswer(3)}
                className="answer-btn"
                disabled={isSaving}
              >
                どちらでもない
              </button>
              <button
                onClick={() => handleAnswer(4)}
                className="answer-btn"
                disabled={isSaving}
              >
                ややそう思う
              </button>
              <button
                onClick={() => handleAnswer(5)}
                className="answer-btn"
                disabled={isSaving}
              >
                とてもそう思う
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
