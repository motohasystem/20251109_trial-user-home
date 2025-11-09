import { UserProfile } from '../types';

/**
 * サンプルユーザーデータ
 */
export const sampleUserProfile: UserProfile = {
  nickname: '太郎さん',
  nearestShelter: '中央公園避難所',
  personalityResult: {
    type: '冷静沈着タイプ',
    description: '緊急時でも落ち着いて行動できる性格です。',
    traits: [
      '冷静な判断力',
      'リーダーシップ',
      '周りを助ける優しさ',
    ],
  },
  pakkaanResult: {
    level: 5,
    type: 'スーパーパッカーン',
    score: 95,
    comment: '素晴らしい防災意識です！日頃の備えが完璧です。',
  },
};
