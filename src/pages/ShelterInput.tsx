import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateShelter } from '../utils/api';
import { getUserIdFromToken } from '../utils/auth';
import './InputPage.css';

/**
 * 最寄りの避難所入力ページ
 */
export const ShelterInput: React.FC = () => {
  const navigate = useNavigate();
  const [shelter, setShelter] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = getUserIdFromToken();
    if (!userId) {
      alert('ユーザー情報が取得できませんでした');
      return;
    }

    setIsSaving(true);
    try {
      await updateShelter(userId, shelter);
      alert('避難所情報を保存しました');
      navigate('/');
    } catch (error) {
      console.error('Failed to update shelter:', error);
      alert('避難所情報の保存に失敗しました');
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
        <h1>最寄りの避難所</h1>
      </header>

      <main className="page-content">
        <form onSubmit={handleSubmit} className="input-form">
          <div className="form-group">
            <label htmlFor="shelter" className="form-label">
              避難所名を入力してください
            </label>
            <input
              type="text"
              id="shelter"
              value={shelter}
              onChange={(e) => setShelter(e.target.value)}
              className="form-input"
              placeholder="例: 中央公園避難所"
              disabled={isSaving}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={isSaving || !shelter.trim()}
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
