import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container, Typography, Box, Button, Chip } from '@mui/material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CodeIcon from '@mui/icons-material/Code';

import { projectsData } from '@/data/projectsData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  // IDが一致する作品データを検索
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      {/* ─── 1. ヘッダーセクション ─── */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          pt: { xs: 4, md: 8 },
          pb: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="md">
          {/* プロジェクト画像（アイキャッチ） */}
          {project.imageUrl && (
            <Box
              sx={{
                width: '100%',
                maxHeight: '280px',
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={project.imageUrl}
                alt={project.title}
                sx={{
                  width: 'auto', // ★ 横幅は画像自体の幅に合わせる
                  height: 'auto', // ★ 縦横比を完全に維持
                  maxWidth: '100%', // ★ 親要素（Container）からはみ出さない防護柵
                  maxHeight: '260px', // ★ 縦幅を260pxでカチッと止める
                  objectFit: 'contain', // ★ 枠の中にすべてを綺麗に収める（切り抜きなし）
                  borderRadius: 4,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)', // マイルドな影に変更
                }}
              />
            </Box>
          )}

          {/* タイトル */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            {project.title}
          </Typography>

          {/* 所属・背景 */}
          <Typography
            variant="body1"
            sx={{
              display: 'block',
              mb: 2, // 期間との余白
              color: 'primary.main',
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.1rem' },
              letterSpacing: '0.02em',
            }}
          >
            {project.context}
          </Typography>

          {/* 実施期間 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 3,
              color: 'text.secondary',
            }}
          >
            <CalendarMonthIcon fontSize="small" />
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, letterSpacing: '0.05em' }}
            >
              {project.period}
            </Typography>
          </Box>

          {/* 概要 */}
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              lineHeight: 2,
              color: 'text.primary',
              mb: 4,
            }}
          >
            {project.summary}
          </Typography>

          {/* 使用技術バッジ一覧 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
                mr: 1,
              }}
            >
              <CodeIcon fontSize="small" />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                TECH STACK
              </Typography>
            </Box>
            {project.technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  backgroundColor: 'background.paper',
                  border: '1px solid rgba(0,0,0,0.08)',
                  fontWeight: 600,
                  color: 'text.secondary',
                  px: 0.5,
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* ─── 2. メインコンテンツセクション ─── */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        {project.content ? (
          project.content
        ) : (
          <Typography color="text.secondary" align="center">
            コンテンツを準備中です。
          </Typography>
        )}
      </Container>

      {/* ─── 3. Topボタン（PCは左上、スマホは右下に自動切り替え） ─── */}
      <Box
        sx={{
          position: 'fixed',

          // ★ 縦位置のレスポンシブ制御
          top: { xs: 'auto', md: 32 }, // スマホではtopを無効化、PCでは上から32px
          bottom: { xs: 32, md: 'auto' }, // スマホでは下から32px、PCではbottomを無効化

          // ★ 横位置のレスポンシブ制御
          left: { xs: 'auto', md: 32 }, // スマホではleftを無効化、PCでは左から32px
          right: { xs: 32, md: 'auto' }, // スマホでは右から32px、PCではrightを無効化

          zIndex: 1000,
        }}
      >
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="inherit"
            // 💡 アイコンの位置も、PC（左上）ならテキストの左（start）、スマホ（右下）ならテキストの右（end）に動的切り替え
            startIcon={
              <SettingsBackupRestoreIcon
                sx={{ display: { xs: 'none', md: 'block' } }}
              />
            }
            endIcon={
              <SettingsBackupRestoreIcon
                sx={{ display: { xs: 'block', md: 'none' } }}
              />
            }
            sx={{
              fontWeight: 'bold',
              px: 3,
              py: 1.5,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: 'background.paper',
              color: 'text.primary',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'action.hover',
                boxShadow: 4,
              },
            }}
          >
            Top
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
