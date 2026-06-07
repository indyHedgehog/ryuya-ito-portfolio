import { Project } from '@/types/project';

export const projectsData: Project[] = [
  {
    id: 'staffing-system',
    title: 'Figamaを用いたプロトタイピング作成',
    shortDescription:
      '人材系システム刷新の入札争いにデモ作成チームとして参加し、入札に貢献。',
    fullDescription:
      'イベント運営におけるスタッフの配置やスケジュール管理を円滑にするための社内向けWebシステムです。',
    imageUrl: '/images/works/Figma Icon (Full-color).svg', // public/images/ 内に配置
    issue:
      '手動でのスタッフマッチングに膨大な時間がかかり、配置ミスが発生していた。',
    approach:
      '直感的に操作できるカレンダーUIと、スキルに応じた自動フィルタリング機能の導入。',
    ingenuity:
      'MUIのコンポーネントをカスタマイズし、情報量が多くても scannable（一目で把握できる）な画面設計を意識しました。',
  },
  // {
  //   id: 'ex',
  //   title: '人材派遣・イベント運営会社向けシステム',
  //   shortDescription:
  //     'Figmaによる画面設計からReact実装までを担当した管理システム。',
  //   fullDescription:
  //     'イベント運営におけるスタッフの配置やスケジュール管理を円滑にするための社内向けWebシステムです。',
  //   imageUrl: '/images/project1.jpg', // public/images/ 内に配置
  //   issue:
  //     '手動でのスタッフマッチングに膨大な時間がかかり、配置ミスが発生していた。',
  //   approach:
  //     '直感的に操作できるカレンダーUIと、スキルに応じた自動フィルタリング機能の導入。',
  //   ingenuity:
  //     'MUIのコンポーネントをカスタマイズし、情報量が多くても scannable（一目で把握できる）な画面設計を意識しました。',
  // },
];
