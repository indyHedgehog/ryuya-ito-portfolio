import { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: 'my-portfolio',
    title: "Ryuya's laboratory作成（Webサイト）",
    context: '個人開発',
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
    context: '株式会社NTTデータCCS 所属時',
    period: '2025.07 - 2025.09',
    technologies: ['Figma', 'UI/UX'],
    summary:
      '大手イベント会社のシステム刷新コンペにて、画面設計・プロトタイプ作成を担当しました。',
    imageUrl: '/images/works/Figma.webp',
    // content: <Work1 /> // ★ ここで個別コンポーネントをドッキング！
  },
  {
    id: 'digital-twin-platform',
    title: 'デジタルツインWebアプリケーション開発',
    context: '株式会社NTTデータCCS 所属時',
    period: '2025.10 - 2026.02', // タイムラインに沿って設定（適宜調整してください）
    technologies: [
      'React',
      'TypeScript',
      'MapLibre GL',
      'Three.js',
      'Shader (GLSL)',
      'Material UI',
    ],
    summary:
      '広域な3D都市モデルや衛星画像、地図データをWebブラウザ上で統合・可視化する大型プラットフォームのフロントエンド開発を担当。',
    imageUrl: '/images/works/DigitalTwin.webp', // 開発イメージやダッシュボードのモック等
    // content: <Work3 /> // ★ 後ほど詳細用の個別コンポーネントをここにドッキング
  },
  {
    id: 'upcycle-package-pot',
    title: 'アップサイクル調味料パッケージの提案・試作',
    context: '大学（パッケージデザイン・プロダクト造形演習）',
    period: '2021',
    technologies: [
      'Rhinoceros',
      '3D Printer',
      'Product Design',
      'Upcycling Design',
    ],
    summary:
      '使い終わった後に「植木鉢」へと生まれ変わる、サステナブルな調味料入れのパッケージデザイン。モデリングには Rhinoceros を用い、3Dプリンターにて作成。',
    imageUrl: '/images/works/littlePot/little_comp.webp', // 3Dモデルのレンダリング画像や実物写真のパス
    // content: <Work4 /> // ★ 今後詳細ページを構築する際のコンポーネント枠
  },
];
