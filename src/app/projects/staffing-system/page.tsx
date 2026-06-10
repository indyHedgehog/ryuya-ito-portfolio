// app/projects/staffing-system-figma/page.tsx
'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { Section } from '@/components/Section';
import { projectsData } from '@/data/projectsData';

// アイコンのインポート（必要に応じてパッケージを確認してください）
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import ApartmentIcon from '@mui/icons-material/Apartment';
import SpeedIcon from '@mui/icons-material/Speed';
import PsychologyIcon from '@mui/icons-material/Psychology';

export default function StaffingSystemFigmaPage() {
  const project = projectsData.find((p) => p.id === 'staffing-system');

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
      <Box sx={{ mt: { xs: 6, md: 10 } }}>
        {/* ─── セクション1：コンペ獲得を支えた2つのコア・アプローチ ─── */}
        <Section title="評価された2つのアプローチ">
          <Container maxWidth="md" sx={{ py: 4 }}>
            <Grid container spacing={4}>
              {/* 強み1 */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: 1,
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mb: 2, alignItems: { sm: 'center' } }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          bgcolor: 'primary.lighter',
                          borderRadius: 2,
                          color: 'primary.main',
                          display: 'flex',
                        }}
                      >
                        <PsychologyIcon />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        当事者目線のユーザーに寄り添った画面提案
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8 }}
                    >
                      学生時代にイベント現場でのアルバイトを経験していた強みを活かし、システムを利用する「アルバイト」「現場社員」「本社社員」それぞれの情報粒度ともどかしさをリアルに想像。各アクターが抱えるペインポイントの解消に特化した画面設計・デザインを行い、高い共感を獲得しました。
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* 強み2 */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: 1,
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mb: 2, alignItems: { sm: 'center' } }}
                    >
                      <Box
                        sx={{
                          p: 1,
                          bgcolor: 'success.lighter',
                          borderRadius: 2,
                          color: 'success.main',
                          display: 'flex',
                        }}
                      >
                        <SpeedIcon />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        最新アセット活用による圧倒的な作成スピード
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8 }}
                    >
                      3週間という短いコンペ準備期間を勝ち抜くため、デジタル庁のデザインシステムおよびFigmaの最新AI機能を駆使した効率的なコンポーネント設計を実践。手戻りを防ぐプロトタイピングのワークフローを確立したことで、予定を大幅に前倒しするわずか2週間で高精度なデモ画面群を完成させました。
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Section>

        {/* ─── セクション2：アクター別のUXデザイン・プロトタイプ要件（余白を半分に） ─── */}
        <Box sx={{ mt: { xs: 3, md: 5 } }}>
          <Section title="3つのアクターに応じた体験設計">
            <Container maxWidth="md" sx={{ pt: 0, pb: 4 }}>
              <Stack spacing={4}>
                {/* 1. 本社社員向け要件 */}
                <Card
                  variant="outlined"
                  sx={{ borderRadius: 3, borderColor: 'rgba(0,0,0,0.08)' }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                      sx={{ mb: 2, alignItems: { sm: 'center' } }}
                    >
                      <Chip
                        icon={<ApartmentIcon />}
                        label="本社社員向け"
                        color="primary"
                        variant="filled"
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        属人化の解消とシフト編成の半自動化
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8, mb: 2 }}
                    >
                      RFP（提案依頼書）の分析から、従来の募集案件作成における「特定担当者への属人化」を発見。AIを活用した自動要件生成や、過去の優良案件をワンクリックで複製・取り込める仕組みを提案しました。さらに、コンペの最難関要件であった複雑なシフト調整（メンバー最適配置）の手間を劇的に削減するインタラクションをプロトタイプで具現化しました。
                    </Typography>
                  </CardContent>
                </Card>

                {/* 2. 現場社員向け要件 */}
                <Card
                  variant="outlined"
                  sx={{ borderRadius: 3, borderColor: 'rgba(0,0,0,0.08)' }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                      sx={{ mb: 2, alignItems: { sm: 'center' } }}
                    >
                      <Chip
                        icon={<BadgeIcon />}
                        label="現場社員向け"
                        color="success"
                        variant="filled"
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        超多忙な当日のための「ワンタップ評価システム」
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8 }}
                    >
                      当日の現場社員は、協力会社との折衝やアルバイトの管理対応で1分1秒を争う状況にあります。一人一人を細かく評価する余裕がないというリアルな現場課題に対し、名簿をワンタップするだけで「優良（次回も呼びたいお気に入り）」「注意（トラブル防止マーク）」のタグ付けができるUIを考案。この手軽な現場評価が、自動的に本社の次回のシフト編成データへ還元される循環システムをデザインしました。
                    </Typography>
                  </CardContent>
                </Card>

                {/* 3. アルバイト（キャスト）向け要件 */}
                <Card
                  variant="outlined"
                  sx={{ borderRadius: 3, borderColor: 'rgba(0,0,0,0.08)' }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                      sx={{ mb: 2, alignItems: { sm: 'center' } }}
                    >
                      <Chip
                        icon={<GroupsIcon />}
                        label="アルバイト向け"
                        color="warning"
                        variant="filled"
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        メールからカレンダー形式への直感的なシフト入力
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.8 }}
                    >
                      従来の煩雑なメールベースのシフト回収を廃止。スマートフォンでの操作を前提としたカレンダー形式のUIを採用し、視覚的な入力のしやすさと、提出内容の確認ミスを防ぐ設計を徹底しました。これにより応募の心理的ハードルを下げ、人員確保の初動スピードを向上させる提案を行いました。
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Container>
          </Section>
        </Box>

        {/* ─── 注記セクション（社外秘に対する配慮を明確にするためのフッター） ─── */}
        <Container maxWidth="md" sx={{ pb: 8, mt: 4 }}>
          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ display: 'block', textAlign: 'center', fontStyle: 'italic' }}
          >
            ※
            本プロジェクトはコンペティションの守秘義務契約（NDA）に基づき、具体的なFigma画面、プロトタイプ、および企業名・システム名に関する視覚的情報の掲載を控え、設計要件と言語ロジックのみを掲載しています。
          </Typography>
        </Container>
      </Box>
    </>
  );
}
