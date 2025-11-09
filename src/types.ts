/**
 * ユーザープロフィールの型定義
 */
export interface UserProfile {
  /** ニックネーム */
  nickname: string;
  /** 最寄りの避難所 */
  nearestShelter: string;
  /** 性格診断結果 */
  personalityResult: PersonalityResult;
  /** パッカーン結果 */
  pakkaanResult: PakkaanResult;
}

/**
 * 性格診断結果
 */
export interface PersonalityResult {
  /** 性格タイプ */
  type: string;
  /** 性格の説明 */
  description: string;
  /** 特徴 */
  traits: string[];
}

/**
 * パッカーン結果
 */
export interface PakkaanResult {
  /** パッカーンレベル */
  level: number;
  /** パッカーンタイプ */
  type: string;
  /** スコア */
  score: number;
  /** 評価コメント */
  comment: string;
}
