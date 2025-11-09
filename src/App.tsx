import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProfileScreen } from './components/UserProfileScreen';
import { ShelterInput } from './pages/ShelterInput';
import { PersonalityTest } from './pages/PersonalityTest';
import { PakkaanTest } from './pages/PakkaanTest';
import { UserProfile } from './types';
import { fetchUserProfile } from './utils/api';
import { getUserIdFromToken, saveToken } from './utils/auth';
import './App.css';

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const userId = getUserIdFromToken();

      if (!userId) {
        // デモ用: JWTトークンがない場合はサンプルトークンを設定
        // 実際の実装では、ログイン画面にリダイレクトするなど
        const demoToken = createDemoToken();
        saveToken(demoToken);
      }

      const userIdFinal = getUserIdFromToken();
      if (userIdFinal) {
        const data = await fetchUserProfile(userIdFinal);
        setProfile(data);
      }
    } catch (err) {
      // APIがない場合のフォールバック: サンプルデータを使用
      console.warn('API unavailable, using sample data:', err);
      setProfile({
        nickname: 'ゲストユーザー',
        nearestShelter: null,
        personalityResult: null,
        pakkaanResult: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="app loading">
        <div className="loading-message">読み込み中...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="app error">
        <div className="error-message">
          エラーが発生しました。ページを再読み込みしてください。
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<UserProfileScreen profile={profile} onProfileUpdate={loadProfile} />}
          />
          <Route path="/shelter" element={<ShelterInput />} />
          <Route path="/personality" element={<PersonalityTest />} />
          <Route path="/pakkaan" element={<PakkaanTest />} />
        </Routes>
      </div>
    </Router>
  );
}

// デモ用のJWTトークン生成関数
function createDemoToken(): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      userId: 'demo-user-123',
      exp: Math.floor(Date.now() / 1000) + 3600 * 24, // 24時間後
    })
  );
  const signature = 'demo-signature';
  return `${header}.${payload}.${signature}`;
}

export default App;
