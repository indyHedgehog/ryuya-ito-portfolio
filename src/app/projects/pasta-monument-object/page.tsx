// app/project/pasta-monument-object/page.tsx
'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import { Container, Box, Typography, Grid } from '@mui/material';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { Section } from '@/components/Section';
import { projectsData } from '@/data/projectsData';

// パスタオブジェクトプロジェクト専用の画像配列
const PASTA_IMAGES = [
  {
    src: '/images/works/reliance/prototype1.webp',
    alt: 'プロトタイピング',
  },
  {
    src: '/images/works/reliance/prototype2.webp',
    alt: '途中経過',
  },
  {
    src: '/images/works/reliance/reliance.webp',
    alt: '作品: Reliance',
  },
];

export default function PastaMonumentObjectPage() {
  // 💡 修正：IDを pasta-monument-object に変更して検索
  const project = projectsData.find((p) => p.id === 'pasta-monument-object');

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* ─── 1. ヘッダーセクション ─── */}
      <ProjectHeader
        title={project.title}
        context={project.context}
        period={project.period}
        summary={project.summary}
        imageUrl={project.imageUrl}
        technologies={project.technologies}
      />

      {/* ─── 2. メインコンテンツセクション ─── */}
      {/* ─── 造形コンセプト ─── */}
      <Box sx={{ mt: { xs: 6, md: 10 } }}>
        <Section title="造形コンセプト">
          <Container maxWidth="md" sx={{ pt: 0, pb: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 6, md: 8 },
              }}
            >
              {/* ─── パーツ1：左に画像、右に文（制作の背景と狙い） ─── */}
              <Grid
                container
                spacing={{ xs: 4, md: 6 }}
                sx={{ alignItems: 'center' }}
              >
                {/* 左側：画像 */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      width: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                      border: '1px solid rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/works/reliance/shop.webp"
                      alt="正方形ボード上の空間設計"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Grid>

                {/* 右側：文面 */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ pl: { md: 2 } }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: 'text.primary',
                      }}
                    >
                      作品制作の背景
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8, fontSize: '0.95rem' }}
                    >
                      本作品は「正方形のボード上に自由なコンセプトでオブジェのミニチュアを構築する」とい造形の演習にて作成しました。
                      私は小売店などの商業空間にて、買い物客に「なんだこれ」と思わせるオブジェクトで、潜在的な購買意欲を刺激できないかと考えました。
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* ─── パーツ2：左に文、右に画像（素材選定とRelianceの経緯） ─── */}
              {/* 💡 🚀 修正：スマホ(xs)では画像が上になるよう direction をコントロール */}
              <Grid
                container
                spacing={{ xs: 4, md: 6 }}
                sx={{ alignItems: 'center' }}
              >
                {/* 左側：文面 */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
                  <Box sx={{ pr: { md: 2 } }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: 'text.primary',
                      }}
                    >
                      素材選択とテーマ決定
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8, fontSize: '0.95rem' }}
                    >
                      視覚的フックとして、調理やソース、調味料を直感的に連想させる日常的な食品「パスタ」を素材に選びました。
                      単独では何にもなれないパスタが、トマト缶に対して「早く完成させてくれ」と纏わり縋る（すがる）造形へと行き着き、作品のテーマである『Reliance（依存）』が誕生しました。
                    </Typography>
                  </Box>
                </Grid>

                {/* 右側：画像 */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
                  <Box
                    sx={{
                      width: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                      border: '1px solid rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/works/reliance/why.webp" // 💡 パスタがトマト缶に絡みつくマクロ撮影などの写真のパス
                      alt="作品コンセプトディテール"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Section>
      </Box>

      {/* ─── 過程と完成品 ─── */}
      <Box
        sx={{
          mt: { xs: 1, md: 2 },
          '& > section, & > div': { pt: 0 },
        }}
      >
        <Section title="プロトタイピングから完成まで">
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 4, md: 6 },
                width: '100%',
              }}
            >
              {PASTA_IMAGES.map((img, index) => (
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
