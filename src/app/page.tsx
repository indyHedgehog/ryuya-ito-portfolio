'use client';

import { Container, Typography, Box, Divider } from '@mui/material';
import { ProjectList } from '@/components/ProjectList';
import { Contact } from '@/components/Contact';
import { projectsData } from '@/data/projectsData';
import { AboutMe } from '@/components/AboutMe';
import { Section } from '@/components/Section';
import { HobbyList } from '@/components/HobbyCard';
import { Header } from '@/components/Header'; // ★ ヘッダーをインポート

export default function Home() {
  return (
    // Top位置の基準となるidを設定
    <Box id="top">
      {/* ★ ヘッダーコンポーネントを配置 */}
      <Header />

      {/* ヘッダーが上部にかぶるため、コンテンツ全体に少し多めの pt を持たせるか、調整を入れると綺麗です */}
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
        {/* ★ スムーススクロール用のidを付与 */}
        <Box id="about-me">
          <Section title="About Me">
            <AboutMe />
          </Section>

          <Section title="Hobbies">
            <HobbyList />
          </Section>
        </Box>

        {/* 3. 作品一覧（プロダクト）セクション */}
        {/* ★ スムーススクロール用のidを付与（Worksに紐付け） */}
        <Box id="works">
          <Section title="Works">
            <ProjectList projects={projectsData} />
          </Section>
        </Box>

        <Divider sx={{ my: 6 }} />

        {/* 4. コンタクトセクション */}
        {/* ★ スムーススクロール用のidを付与 */}
        <Box id="contact">
          <Contact />
        </Box>
      </Container>
    </Box>
  );
}
