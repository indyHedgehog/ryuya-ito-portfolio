'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

// 縦並びにする5つのwebp画像のパスと、それぞれの解説用アクセシビリティテキスト
const ENCOUNTER_IMAGES = [
  {
    src: '/images/works/encounter/leaflet1.webp',
    alt: '表紙',
  },
  { src: '/images/works/encounter/leaflet2.webp', alt: 'コンセプト' },
  {
    src: '/images/works/encounter/leaflet3.webp',
    alt: 'テーマ',
  },
  {
    src: '/images/works/encounter/leaflet4.webp',
    alt: '平面図',
  },
  {
    src: '/images/works/encounter/leaflet5.webp',
    alt: '外観パース',
  },
];

export const MuseumEncounter: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 4, md: 6 }, // 画像と画像の間の余白（スマホではマイルドに、PCではダイナミックに）
        width: '100%',
      }}
    >
      {ENCOUNTER_IMAGES.map((img, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            backgroundColor: 'background.paper',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', // マイルドで洗練された影
            border: '1px solid rgba(0, 0, 0, 0.04)',
            transition: 'transform 0.4s ease, boxShadow 0.4s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
            },
          }}
        >
          {/* 画像本体 */}
          <Box
            component="img"
            src={img.src}
            alt={img.alt}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />

          {/* 画像の下にそっと添えるキャプション（ポートフォリオの丁寧さを演出） */}
          <Box
            sx={{
              px: 3,
              py: 2,
              backgroundColor: '#fdfdfd',
              borderTop: '1px solid rgba(0, 0, 0, 0.02)',
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                component="span"
                sx={{
                  color: 'primary.main',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                }}
              >
                0{index + 1}
              </Box>
              {img.alt}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
