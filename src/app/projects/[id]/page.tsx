import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link'; // ★ インポートを追加
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
} from '@mui/material'; // ★ Buttonを追加
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { projectsData } from '@/data/projectsData';
import { Contact } from '@/components/layout/Contact';

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
    // ボタンを画面全体に対して固定配置（fixed）しやすくするため、最外殻をBoxにしています
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {project.title}
        </Typography>

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

      {/* 右下に常に固定表示されるTopボタン */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="inherit"
            endIcon={<SettingsBackupRestoreIcon />} // ★ 修正：startIcon を endIcon に変更
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
