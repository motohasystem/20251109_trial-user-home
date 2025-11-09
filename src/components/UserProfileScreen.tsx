import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { updateNickname } from '../utils/api';
import { getUserIdFromToken } from '../utils/auth';
import './UserProfileScreen.css';

interface UserProfileScreenProps {
  profile: UserProfile;
  onProfileUpdate: () => void;
}

/**
 * ユーザープロフィール画面コンポーネント
 */
export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  profile,
  onProfileUpdate
}) => {
  const navigate = useNavigate();
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(profile.nickname);
  const [isSaving, setIsSaving] = useState(false);

  const handleNicknameSave = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      alert('ユーザー情報が取得できませんでした');
      return;
    }

    setIsSaving(true);
    try {
      await updateNickname(userId, nickname);
      setIsEditingNickname(false);
      onProfileUpdate();
    } catch (error) {
      console.error('Failed to update nickname:', error);
      alert('ニックネームの更新に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNicknameCancel = () => {
    setNickname(profile.nickname);
    setIsEditingNickname(false);
  };

  return (
    <div className="user-profile-screen">
      <header className="profile-header">
        <h1>ここパカ診断</h1>
        <p className="subtitle">ユーザーホーム画面</p>
      </header>

      <main className="profile-content">
        {/* ニックネーム */}
        <section className="profile-section">
          <h2 className="section-title">ニックネーム</h2>
          <div className="section-content">
            {isEditingNickname ? (
              <div className="nickname-edit">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="nickname-input"
                  disabled={isSaving}
                />
                <div className="nickname-actions">
                  <button
                    onClick={handleNicknameSave}
                    className="btn btn-primary"
                    disabled={isSaving || !nickname.trim()}
                  >
                    {isSaving ? '保存中...' : '保存'}
                  </button>
                  <button
                    onClick={handleNicknameCancel}
                    className="btn btn-secondary"
                    disabled={isSaving}
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div className="nickname-display">
                <p className="nickname">{profile.nickname}</p>
                <button
                  onClick={() => setIsEditingNickname(true)}
                  className="btn btn-edit"
                >
                  編集
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 最寄りの避難所 */}
        <section className="profile-section clickable" onClick={() => navigate('/shelter')}>
          <h2 className="section-title">最寄りの避難所</h2>
          <div className="section-content">
            <p className="shelter-name">
              {profile.nearestShelter || '未設定'}
            </p>
            <span className="nav-arrow">→</span>
          </div>
        </section>

        {/* 性格診断結果 */}
        <section className="profile-section clickable" onClick={() => navigate('/personality')}>
          <h2 className="section-title">性格診断結果</h2>
          <div className="section-content">
            {profile.personalityResult ? (
              <div className="personality-result">
                <h3 className="personality-type">{profile.personalityResult.type}</h3>
                <p className="personality-description">
                  {profile.personalityResult.description}
                </p>
              </div>
            ) : (
              <p className="not-set">未診断</p>
            )}
            <span className="nav-arrow">→</span>
          </div>
        </section>

        {/* パッカーン結果 */}
        <section className="profile-section clickable" onClick={() => navigate('/pakkaan')}>
          <h2 className="section-title">パッカーン結果</h2>
          <div className="section-content">
            {profile.pakkaanResult ? (
              <div className="pakkaan-result">
                <div className="pakkaan-header">
                  <span className="pakkaan-level">レベル {profile.pakkaanResult.level}</span>
                  <h3 className="pakkaan-type">{profile.pakkaanResult.type}</h3>
                </div>
                <div className="pakkaan-score">
                  <div className="score-value">{profile.pakkaanResult.score}</div>
                </div>
              </div>
            ) : (
              <p className="not-set">未診断</p>
            )}
            <span className="nav-arrow">→</span>
          </div>
        </section>
      </main>
    </div>
  );
};
