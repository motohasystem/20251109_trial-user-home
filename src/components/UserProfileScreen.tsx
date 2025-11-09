import React from 'react';
import { UserProfile } from '../types';
import './UserProfileScreen.css';

interface UserProfileScreenProps {
  profile: UserProfile;
}

/**
 * ユーザープロフィール画面コンポーネント
 */
export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ profile }) => {
  return (
    <div className="user-profile-screen">
      <header className="profile-header">
        <h1>ここパカ診断</h1>
        <p className="subtitle">ユーザープロフィール</p>
      </header>

      <main className="profile-content">
        {/* ニックネーム */}
        <section className="profile-section">
          <h2 className="section-title">ニックネーム</h2>
          <div className="section-content">
            <p className="nickname">{profile.nickname}</p>
          </div>
        </section>

        {/* 最寄りの避難所 */}
        <section className="profile-section">
          <h2 className="section-title">最寄りの避難所</h2>
          <div className="section-content">
            <p className="shelter-name">{profile.nearestShelter}</p>
          </div>
        </section>

        {/* 性格診断結果 */}
        <section className="profile-section">
          <h2 className="section-title">性格診断結果</h2>
          <div className="section-content">
            <div className="personality-result">
              <h3 className="personality-type">{profile.personalityResult.type}</h3>
              <p className="personality-description">
                {profile.personalityResult.description}
              </p>
              <div className="traits">
                <h4>あなたの特徴:</h4>
                <ul className="traits-list">
                  {profile.personalityResult.traits.map((trait, index) => (
                    <li key={index} className="trait-item">
                      {trait}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* パッカーン結果 */}
        <section className="profile-section">
          <h2 className="section-title">パッカーン結果</h2>
          <div className="section-content">
            <div className="pakkaan-result">
              <div className="pakkaan-header">
                <span className="pakkaan-level">レベル {profile.pakkaanResult.level}</span>
                <h3 className="pakkaan-type">{profile.pakkaanResult.type}</h3>
              </div>
              <div className="pakkaan-score">
                <div className="score-label">スコア</div>
                <div className="score-value">{profile.pakkaanResult.score}</div>
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${profile.pakkaanResult.score}%` }}
                  />
                </div>
              </div>
              <p className="pakkaan-comment">{profile.pakkaanResult.comment}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
