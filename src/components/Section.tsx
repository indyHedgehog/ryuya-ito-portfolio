'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface SectionProps {
  title: string; // セクションの見出し（例: "About Me" や "Projects"）
  children: React.ReactNode; // セクションの中身（ProfileやProjectListなど）
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    // 項目のレイアウト（最大幅 800px、左右中央寄せ、下部マージン 12）をここで統一
    <Box sx={{ mb: 12, maxWidth: '800px', mx: 'auto' }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};
