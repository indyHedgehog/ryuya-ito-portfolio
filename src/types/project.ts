export interface Project {
  id: string;
  title: string;
  shortDescription: string; // カード用の短い概要
  fullDescription: string; // 詳細ページ用の長い概要
  imageUrl: string; // 画像URL（またはパブリックのパス）
  issue: string; // 課題
  approach: string; // アプローチの観点
  ingenuity: string; // 工夫した点
}
