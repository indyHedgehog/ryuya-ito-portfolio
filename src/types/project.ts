// types/project.ts
import React from 'react';

export interface Project {
  id: string;
  title: string;
  period: string; // 実施期間 (例: "2025.10 - 2026.02")
  technologies: string[]; // 使用技術 (例: ["React", "TypeScript", "Material UI"])
  summary: string; // 概要・要約
  imageUrl: string; // ヘッダー用アイキャッチ画像

  // 各プロジェクト固有のメインコンテンツ（コンポーネント）を保持する枠
  content?: React.ReactNode;
}
