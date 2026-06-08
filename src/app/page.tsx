'use client';

import { Container, Typography, Box, Divider, Grid } from '@mui/material';
import { ProjectList } from '@/components/ProjectList';
import { Contact } from '@/components/layout/Contact';
import { projectsData } from '@/data/projectsData';
import { AboutMe } from '@/components/AboutMe';
import { Section } from '@/components/Section';
import { HobbyList } from '@/components/HobbyCard';
import { Header } from '@/components/layout/Header'; // ★ ヘッダーをインポート
import { SkillMagnet } from '@/components/SkillMagnet';

export default function Home() {
  return (
    <Box id="top">
      <Header />
      <Container maxWidth="lg" sx={{ py: 8, mt: { xs: 4, md: 8 } }}>
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
            Ryuya's laboratory
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color="text.secondary"
            sx={{ fontWeight: '400' }}
          >
            IT & Design / Creating with joy.
          </Typography>
        </Box>

        <Divider sx={{ mb: 8 }} />

        {/* 2. プロフィールセクション */}
        <Box id="about-me">
          <Section title="About Me">
            <AboutMe />
          </Section>

          <Section title="Skills">
            <Grid container spacing={3}>
              <SkillMagnet />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '1.1rem', lineHeight: 2.3 }}
              >
                私の強みは、デザイン・3Dモデリング・フロントエンド開発の3つの領域をシームレスに横断できることです。Figmaによる直感的なUI設計から、Three.jsやMapLibreを用いたインタラクティブな表現、そしてTypeScript
                /
                Reactによるモダンなコンポーネント実装まで、プロダクトの価値を最大化するためのテクノロジーとデザインを追求しています。
              </Typography>
            </Grid>
          </Section>
        </Box>

        {/* 3. 作品一覧（プロダクト）セクション */}
        <Box id="works">
          <Section title="Works">
            <ProjectList projects={projectsData} />
          </Section>
        </Box>

        <Box>
          <Section title="Hobbies">
            <HobbyList />
          </Section>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* 4. コンタクトセクション */}
        <Box id="contact">
          <Contact />
        </Box>
      </Container>
    </Box>
  );
}
