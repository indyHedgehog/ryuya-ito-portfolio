'use client';

import React from 'react';
import { Box, Typography, Stack, Link as MuiLink } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';

export const Contact: React.FC = () => {
  return (
    <Box
      sx={{
        py: 6,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        mt: 8,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Contact
      </Typography>

      <Stack
        // ★ 修正箇所1: スマホ(xs)では縦並び(column)、タブレット以上(sm)では横並び(row)に自動切替
        direction={{ xs: 'column', sm: 'row' }}
        // ★ 修正箇所2: 縦並びの時は少し広め(3)、横並びの時は標準(4)の間隔を空ける
        spacing={{ xs: 3, sm: 4 }}
        sx={{
          mt: 4,
          justifyContent: 'center',
          alignItems: 'center', // ★ 修正箇所3: 縦並びになった際、子要素を横方向の中央に揃える
        }}
      >
        <MuiLink
          href="https://instagram.com/_50y.ka_"
          target="_blank"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          <InstagramIcon color="secondary" /> @_50y.ka_
        </MuiLink>

        <MuiLink
          href="mailto:ryuya20011108@gmail.com"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // ★ 修正箇所4: リンク単体の中でも中身を中央寄せに
            gap: 1,
            textDecoration: 'none',
            width: 'fit-content', // 幅を中身に合わせることで、ホバー領域を最適化
          }}
        >
          <EmailIcon color="primary" /> ryuya20011108@gmail.com
        </MuiLink>

        <MuiLink
          href="tel:08084717774"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          <PhoneIcon sx={{ color: 'green' }} /> 080-8471-7774
        </MuiLink>
      </Stack>
    </Box>
  );
};
