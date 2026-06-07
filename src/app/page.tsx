'use client';

import { Container, Typography, Box, Grid, Divider } from '@mui/material';
import { ProjectCard } from '@/components/ProjectCard';
import { Contact } from '@/components/Contact';
import { projectsData } from '@/data/projectsData';

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
      <Box sx={{ mb: 12 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          About Me
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '800px' }}
        >
          システムエンジニアとして上流工程からフロントエンドの実装、UI/UXデザインまで幅広く携わっています。
          React, TypeScript, MUI
          などのモダンな技術スタックを用いた、ユーザーが直感的に操作できる画面設計と、堅牢なコンポーネント開発を得意としています。
        </Typography>
      </Box>

      {/* 3. 作品一覧（プロダクト）セクション */}
      <Box sx={{ mb: 12 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Projects
        </Typography>

        {/* MUIの新しいGridシステムを使用 */}
        <Grid container spacing={4}>
          {projectsData.map((project) => (
            <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
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
