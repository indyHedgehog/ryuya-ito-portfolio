'use client';

import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  Avatar,
} from '@mui/material';
import { ProjectCard } from '@/components/ProjectCard';
import { Contact } from '@/components/Contact';
import { projectsData } from '@/data/projectsData';
import { AboutMe } from '@/components/AboutMe';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* 1. タイトル＆ヒーローセクション */}
      <Box sx={{ textBreak: 'keep-all', mb: 10, textAlign: 'center' }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: '800',
            letterSpacing: '-0.02em',
            color: 'text.primary',
          }}
        >
          Ryuya Ito / Portfolio
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          color="text.secondary"
          sx={{ fontWeight: '400' }}
        >
          Front-end Development & UI/UX Design
        </Typography>
      </Box>

      <Divider sx={{ mb: 8 }} />

      {/* 2. プロフィールセクション (簡易版) */}
      <Box sx={{ mb: 12, maxWidth: '800px', mx: 'auto' }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          About Me
        </Typography>

        {/* 写真とテキストを横並び（スマホでは縦並び）にするためのコンテナ */}
        <AboutMe />
      </Box>

      {/* 3. 作品一覧（プロダクト）セクション */}
      <Box sx={{ mb: 12, maxWidth: '800px', mx: 'auto' }}>
        {' '}
        {/* ★ About Me と同じ幅 (800px) に合わせると綺麗にまとまります */}
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Projects
        </Typography>
        <Grid container spacing={4}>
          {projectsData.map((project) => (
            <Grid key={project.id} size={{ xs: 12 }}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* 4. コンタクトセクション */}
      <Contact />
    </Container>
  );
}
