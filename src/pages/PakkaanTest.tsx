import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { savePakkaanResult } from '../utils/api';
import { getUserIdFromToken } from '../utils/auth';
import './InputPage.css';

/**
 * パッカーン診断ページ
 */
export const PakkaanTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // 防災意識に関する質問
  const questions = [
    '非常用の水や食料を備蓄していますか？',
    '避難経路を確認していますか？',
    '防災グッズを準備していますか？',
    '家族との連絡方法を決めていますか？',
    '定期的に防災訓練に参加していますか？',
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

    setIsSaving(true);
    try {
      await savePakkaanResult(userId, result);
      alert('パッカーン診断結果を保存しました');
      navigate('/');
    } catch (error) {
      console.error('Failed to save pakkaan result:', error);
      alert('パッカーン診断結果の保存に失敗しました');
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
        <h1>パッカーン診断</h1>
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
                全くしていない
              </button>
              <button
                onClick={() => handleAnswer(2)}
                className="answer-btn"
                disabled={isSaving}
              >
                あまりしていない
              </button>
              <button
                onClick={() => handleAnswer(3)}
                className="answer-btn"
                disabled={isSaving}
              >
                普通
              </button>
              <button
                onClick={() => handleAnswer(4)}
                className="answer-btn"
                disabled={isSaving}
              >
                よくしている
              </button>
              <button
                onClick={() => handleAnswer(5)}
                className="answer-btn"
                disabled={isSaving}
              >
                完璧にしている
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
