import React from 'react';
import { UserProfileScreen } from './components/UserProfileScreen';
import { sampleUserProfile } from './data/sampleData';
import './App.css';

function App() {
  return (
    <div className="app">
      <UserProfileScreen profile={sampleUserProfile} />
    </div>
  );
}

export default App;
