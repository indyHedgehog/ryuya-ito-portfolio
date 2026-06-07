'use client';

import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

export const AboutMe: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // スマホでは縦、PC（md以上）では横並び
        alignItems: { xs: 'center', md: 'center' }, // スマホでは中央寄せ、PCでは上揃え
        gap: { xs: 4, md: 5 }, // 写真とテキストの間の余白
      }}
    >
      {/* 左側：顔写真（Avatarを使うと自動で綺麗な丸型になります） */}
      <Box
        component="img"
        src="/images/me.webp" // ★ public/images/ 内に配置したご自身の写真のファイル名に書き換えてください
        alt="Ryuya Ito"
        sx={{
          width: { xs: 160, md: 200 }, // スマホでは160px、PCでは200pxの横幅
          // height: { xs: 160, md: 200 }, // 縦幅（正方形にトリミングされます）
          objectFit: 'cover', // 枠線のサイズに合わせて画像を綺麗に収めます
          borderRadius: 1, // 角の丸み
          boxShadow: 2, // ほんのり浮き上がる影
        }}
      />

      {/* 右側：自己紹介テキスト */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Grid container spacing={4}>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: '1.1rem', lineHeight: 2.3 }}
          >
            システムエンジニアとして上流工程からフロントエンドの実装、UI/UXデザインまで幅広く携わっています。
            React, TypeScript, MUI
            などのモダンな技術スタックを用いた、ユーザーが直感的に操作できる画面設計と、堅牢なコンポーネント開発を得意としています。
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};
