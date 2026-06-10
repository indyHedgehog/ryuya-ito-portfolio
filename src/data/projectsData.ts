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
  },
  {
    id: 'staffing-system',
    title: '人材管理システム入札 （デモ作成チーム）',
    context: '株式会社NTTデータCCS 所属時',
    period: '2025.07 - 2025.09',
    technologies: ['Figma', 'UI/UX'],
    summary:
      '大手イベント会社のシステム刷新コンペにて、画面設計・プロトタイプ作成を担当し入札。',
    imageUrl: '/images/works/Figma.webp',
    hasDetailPage: true,
  },
  {
    id: 'digital-twin-platform',
    title: 'デジタルツインWebアプリケーション開発',
    context: '株式会社NTTデータCCS 所属時',
    period: '2025.9 - 2026.04', // タイムラインに沿って設定（適宜調整してください）
    technologies: [
      'React',
      'TypeScript',
      'MapLibre GL',
      'Three.js',
      'Material UI',
      'Cypress',
    ],
    summary:
      '広域な3D都市モデルや衛星画像、地図データをWebブラウザ上で統合・可視化する大型プラットフォームのフロントエンド開発を担当。（詳細社外秘のため、サムネイルはAIイメージ）',
    imageUrl: '/images/works/DigitalTwin-image.webp',
  },
  {
    id: 'museum-encounter-design',
    title: '美術館「Encounter」の設計・モデリング',
    context: '大学（建築・空間デザイン演習）', // 統一された青文字で綺麗に表示されます
    period: '2022.06', // 大学時代の適切な時期に調整してください
    technologies: [
      'Spatial Design',
      '3D Modeling',
      'Architecture Concept',
      'UX Design',
    ],
    summary:
      '自然豊かな公園の敷地特性を活かし、「孤独を豊かに愉しみ、作品と一対一で対話する」をコンセプトに掲げた美術館「Encounter」の企画・設計。',
    imageUrl: '/images/works/encounter/gate.webp', // 建築パース、3Dレンダリング、または図面・模型写真のパス
    hasDetailPage: true,
  },
  {
    id: 'pasta-monument-object',
    title: 'モニュメントの提案・ミニチュア造形',
    context: '大学（空間デザイン・立体造形演習）',
    period: '2022.01', // 大学時代の適切な時期に調整してください
    technologies: ['Spatial Design', 'Prototyping', 'Concept Design'],
    summary:
      'モニュメントの提案・ミニチュア作成をする授業にて、単独では何にもなりえパスタを用い、作品: Reliance （依存）を提案・作成しました。',
    imageUrl: '/images/works/reliance_area/complete.webp', // ミニチュアの作品写真やスケッチなどのパス
    hasDetailPage: true,
  },
  {
    id: 'upcycle-package-pot',
    title: 'アップサイクル調味料パッケージの提案・試作',
    context: '大学（パッケージデザイン・プロダクト造形演習）',
    period: '2021.12',
    technologies: [
      'Rhinoceros',
      '3D Printer',
      'Product Design',
      'Upcycling Design',
    ],
    summary:
      '使い終わった後に「植木鉢」へと生まれ変わる、サステナブルな調味料入れのパッケージデザイン。モデリングには Rhinoceros を用い、3Dプリンターにて作成。',
    imageUrl: '/images/works/littlePot/little_comp.webp', // 3Dモデルのレンダリング画像や実物写真のパス
  },
  {
    id: 'internal-tech-study-group',
    title: '開発力ジム（社内勉強会の設立・運営）',
    context: '株式会社NTTデータCCS 所属時',
    period: '2025.05 - 2026.05',
    technologies: [
      'Technical Training',
      'Curriculum Design',
      'Facilitation',
      'Community Management',
    ],
    summary:
      '社内の開発技術基盤の底上げと、知見のボトムアップを目的に、開発知識を総合的に学ぶテック勉強会をゼロから発議・設立。社内有識者をアドバイザーとして巻き込み、若手社員の技術レベル向上に貢献。',
    imageUrl: '/images/works/study.webp',
  },
];
