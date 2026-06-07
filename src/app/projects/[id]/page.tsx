import React from 'react';
import { notFound } from 'next/navigation';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import { projectsData } from '@/data/projectsData';

// Next.jsがURLの[id]を受け取るための型定義
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  // IDが一致する作品データを検索
  const project = projectsData.find((p) => p.id === id);

  // もしデータが見つからなければ404ページを表示
  if (!project) {
    notFound();
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        {project.title}
      </Typography>

      {/* ★ 修正箇所：paragraph を廃止し、component="p" を明示 */}
      <Typography
        variant="h6"
        color="text.secondary"
        component="p"
        sx={{ mb: 3 }}
      >
        {project.fullDescription}
      </Typography>

      <Paper
        variant="outlined"
        sx={{ p: 4, mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
          >
            課題
          </Typography>
          <Typography variant="body1">{project.issue}</Typography>
        </Box>

        <Divider />

        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
          >
            アプローチの観点
          </Typography>
          <Typography variant="body1">{project.approach}</Typography>
        </Box>

        <Divider />

        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
          >
            工夫した点
          </Typography>
          <Typography variant="body1">{project.ingenuity}</Typography>
        </Box>
      </Paper>
    </Container>
  );
}
