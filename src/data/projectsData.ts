import { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: 'my-portfolio',
    title: "Ryuya's laboratory作成（Webサイト）",
    period: '2026.06 - Now', // 2026年現在のタイムラインに合わせています
    technologies: [
      'React',
      'TypeScript',
      'Material UI',
      'Three.js',
      'Framer Motion',
    ],
    summary:
      '「シンプル」な使いやすさと、触れたときの「ワクワク」を両立させることをコンセプトに構築しました。細部までこだわりを詰め込んでいますので、ぜひ楽しんでご覧ください。',
    imageUrl: '/images/works/Portfolio.webp', // ポートフォリオのキャプチャ画像などのパス
    // content: <Work2 /> // ★ この下に用意した個別コンポーネントをドッキング
  },
  {
    id: 'staffing-system',
    title: '人材管理システム入札 （デモ作成チーム）',
    period: '2025.07 - 2025.09',
    technologies: ['Figma', 'UI/UX'],
    summary:
      '大手イベント会社のシステム刷新コンペにて、画面設計・プロトタイプ作成を担当しました。',
    imageUrl: '/images/works/Figma.webp',
    // content: <Work1 /> // ★ ここで個別コンポーネントをドッキング！
  },
  
];
