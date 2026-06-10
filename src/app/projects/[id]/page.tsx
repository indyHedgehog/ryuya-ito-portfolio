'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { Container, Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConstructionIcon from '@mui/icons-material/Construction';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { projectsData } from '@/data/projectsData';

export default function GenericProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  // 該当するプロジェクトデータを取得
  const project = projectsData.find((p) => p.id === id);

  // projectData にも ID が見つからない完全な不正URLの場合は404
  if (!project) {
    notFound();
  }

  return (
    <>
      {/* ─── 1. 通常通りのヘッダー表示 ─── */}
      <ProjectHeader
        title={project.title}
        context={project.context}
        period={project.period}
        summary={project.summary}
        imageUrl={project.imageUrl}
        technologies={project.technologies}
      />

      {/* ─── 2. 詳細説明作成中のステータス表示 ─── */}
      <Container maxWidth="md">
        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            mb: { xs: 10, md: 14 },
            textAlign: 'center',
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: 'action.hover',
            border: '1px dashed rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'warning.lighter',
              color: 'warning.main',
              borderRadius: '50%',
              display: 'inline-flex',
            }}
          >
            <ConstructionIcon sx={{ fontSize: 40 }} />
          </Box>

          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}
            >
              詳細コンテンツを準備中です
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 480, mx: 'auto', lineHeight: 1.8 }}
            >
              現在、こちらのプロジェクトの詳細な設計プロセス、および解説用コンポーネントの構築を進めております。アップデートをお待ちいただけますと幸いです。
            </Typography>
          </Box>

          <Button
            component={Link}
            href="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              mt: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            トップページへ戻る
          </Button>
        </Box>
      </Container>
    </>
  );
}
