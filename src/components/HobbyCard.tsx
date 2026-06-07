'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

// 趣味データの型定義
interface Hobby {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface HobbyCardProps {
  hobby: Hobby;
}

// 1. 単体の趣味カード（上から写真・タイトル・一言）
export const HobbyCard: React.FC<HobbyCardProps> = ({ hobby }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        // ほんのりホバーエフェクトを入れると上品になります
        '&:hover': {
          boxShadow: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={hobby.imageUrl}
        alt={hobby.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 1 }}
        >
          {hobby.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.5 }}
        >
          {hobby.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

// 趣味のダミーデータ（public/images/ 内に配置する画像名に合わせて適宜変更してください）
const hobbiesData: Hobby[] = [
  {
    id: 'fleaMarket',
    title: 'Flea market',
    description: '古着DIGもしますが、洋服やアート作品の出品も行っています。',
    imageUrl: '/images/hobby/fleaMarket.webp',
  },
  {
    id: 'plants',
    title: 'Houseplants',
    description:
      '部屋にグリーンのある北欧インテリアが好きで、様々な観葉植物を育てています。',
    imageUrl: '/images/hobby/plants.webp',
  },
  {
    id: 'training',
    title: 'Training',
    description:
      '健康のために日頃から運動をしてします。筋力トレーニングは10年以上続けています。',
    imageUrl: '/images/hobby/training.webp',
  },
];

// 2. 趣味リスト（3つ横並びにするコンテナ）
export const HobbyList: React.FC = () => {
  return (
    // spacing={3} でカード間の適度な余白を確保
    <Grid container spacing={3}>
      {hobbiesData.map((hobby) => (
        // xs: 12 (スマホでは1列縦並び), sm: 4 (タブレット以上で3列横並び: 12÷4=3カラム)
        <Grid key={hobby.id} size={{ xs: 12, sm: 4 }}>
          <HobbyCard hobby={hobby} />
        </Grid>
      ))}
    </Grid>
  );
};
