// app/project/museum-encounter-design/page.tsx
'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { Container, Box, Typography } from '@mui/material';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { Section } from '@/components/Section';
import { projectsData } from '@/data/projectsData';

// 今回のプロジェクト専用の画像配列
const ENCOUNTER_IMAGES = [
  {
    src: '/images/works/encounter/leaflet1.webp',
    alt: '表紙',
  },
  { src: '/images/works/encounter/leaflet2.webp', alt: 'コンセプト' },
  {
    src: '/images/works/encounter/leaflet3.webp',
    alt: 'コンセプト',
  },
  {
    src: '/images/works/encounter/leaflet4.webp',
    alt: '平面図',
  },
  {
    src: '/images/works/encounter/leaflet5.webp',
    alt: '立面図',
  },
];

export default function MuseumEncounterPage() {
  const project = projectsData.find((p) => p.id === 'museum-encounter-design');

  if (!project) {
    notFound();
  }
  return (
    <>
      {/* ─── ヘッダーコンポーネントの呼び出し（差分データを渡すだけ） ─── */}
      <ProjectHeader
        title={project.title}
        context={project.context}
        period={project.period}
        summary={project.summary}
        imageUrl={project.imageUrl}
        technologies={project.technologies}
      />

      {/* ─── メインコンテンツセクション（このプロジェクト専用の自由空間） ─── */}
      <Box sx={{ mt: { xs: 6, md: 10 } }}>
        <Section title="発表リーフレット">
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 4, md: 6 },
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
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                    border: '1px solid rgba(0, 0, 0, 0.04)',
                  }}
                >
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
                  <Box sx={{ px: 3, py: 2, backgroundColor: '#fdfdfd' }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ color: 'primary.main', fontFamily: 'monospace' }}
                      >
                        0{index + 1}
                      </Box>
                      {img.alt}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Section>
      </Box>
    </>
  );
}
