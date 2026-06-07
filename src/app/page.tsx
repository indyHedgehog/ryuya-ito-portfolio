'use client';

import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  Avatar,
} from '@mui/material';
import { ProjectList } from '@/components/ProjectList';
import { Contact } from '@/components/Contact';
import { projectsData } from '@/data/projectsData';
import { AboutMe } from '@/components/AboutMe';
import { Section } from '@/components/Section';
import { HobbyList } from '@/components/HobbyCard';

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

      {/* 2. プロフィールセクション */}
      <Section title="About Me">
        <AboutMe />
      </Section>

      {/* 3. 趣味セクション */}
      <Section title="Hobbies">
        <HobbyList />
      </Section>

      {/* 4. 作品一覧（プロダクト）セクション */}
      <Section title="Works">
        <ProjectList projects={projectsData} />
      </Section>

      <Divider sx={{ my: 6 }} />

      {/* 4. コンタクトセクション */}
      <Contact />
    </Container>
  );
}
