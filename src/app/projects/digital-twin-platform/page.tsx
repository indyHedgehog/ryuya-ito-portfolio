'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Stack,
  List,
  ListItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import maplibregl from 'maplibre-gl';

import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import TouchAppIcon from '@mui/icons-material/TouchApp';

import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { Section } from '@/components/Section';
import { projectsData } from '@/data/projectsData';
import { MapComponent } from '../../../components/mapComponent/MapComponent';
import { AddPolygonLayer } from '../../../components/mapComponent/AddPolygonLayer';
import { Add3DModelLayer } from '../../../components/mapComponent/Add3DModelLayer';

const MODEL_ORIGIN_LON_LAT: [number, number] = [139.7661, 35.6813];
const MODEL_FILE_PATH =
  'https://maplibre.org/maplibre-gl-js/docs/assets/34M_17/34M_17.gltf';

export default function DigitalTwinPlatformPage() {
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  const project = projectsData.find((p) => p.id === 'digital-twin-platform');

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHeader
        title={project.title}
        context={project.context}
        period={project.period}
        summary={project.summary}
        imageUrl={project.imageUrl}
        technologies={project.technologies}
      />

      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Section title="デジタルツイン・プロトタイプデモ">
          <Container maxWidth="lg" sx={{ pb: 8 }}>
            {/* 技術スタックと検証内容を伝える簡潔な箇条書きエリア */}
            <Box sx={{ mb: 5, maxWidth: '800px' }}>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}
              >
                ※本プロジェクトは詳細社外秘のため、主要な技術スタックを再現した公開用デモを掲載しています。
              </Typography>

              <List
                disablePadding
                sx={{
                  listStyleType: 'disc',
                  pl: 2.5,
                  '& .MuiListItem-root': {
                    display: 'list-item',
                    mb: 1.5,
                    p: 0,
                    lineHeight: 1.6,
                    color: 'text.primary',
                    fontSize: '0.95rem',
                  },
                }}
              >
                <ListItem>
                  <strong>同一WebGLコンテキストの融合</strong>： MapLibre GL JS
                  の地図レイヤーと Three.js
                  の3D空間を同一パイプライン上でシームレスに結合。
                </ListItem>
                <ListItem>
                  <strong>動的な複数レイヤー重畳制御</strong>：
                  複数のGeoJSON（Polygon）をファイル名ベースで識別し、衝突のないマルチレイヤー管理を実現。
                </ListItem>
                <ListItem>
                  <strong>高精度な座標変換同期</strong>：
                  Webメルカトル座標系とThree.jsの3D空間における原点・縮尺を正確に一致させる位置合わせアルゴリズム。
                </ListItem>
                <ListItem>
                  <strong>フロントエンドのメモリ最適化</strong>：
                  コンポーネントのアンマウント時に3Dメッシュやジオメトリを明示的に解放し、メモリリークを徹底抑止。
                </ListItem>
              </List>
            </Box>

            <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
              {/* 地図コンポーネントエリア */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Paper
                  elevation={3}
                  sx={{
                    width: '100%',
                    height: { xs: '350px', sm: '450px', md: '500px' },
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <MapComponent onMapReady={setMapInstance}>
                    <AddPolygonLayer
                      map={mapInstance}
                      geoJsonPath="/data/Thunder1.geojson"
                    />
                    <AddPolygonLayer
                      map={mapInstance}
                      geoJsonPath="/data/Thunder2.geojson"
                    />
                    <AddPolygonLayer
                      map={mapInstance}
                      geoJsonPath="/data/Thunder3.geojson"
                    />
                    <AddPolygonLayer
                      map={mapInstance}
                      geoJsonPath="/data/Thunder4.geojson"
                    />

                    <Add3DModelLayer
                      map={mapInstance}
                      modelOrigin={MODEL_ORIGIN_LON_LAT}
                      modelPath={MODEL_FILE_PATH}
                    />
                  </MapComponent>
                </Paper>
              </Grid>

              {/* 操作説明UIエリア */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    height: { xs: 'auto', md: '100%' },
                    boxSizing: 'border-box',
                    backgroundColor: 'background.neutral',
                    borderRadius: 4,
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  {/* 🖥️ PC向け操作ガイド */}
                  <Stack
                    spacing={2.5}
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 'bold', color: 'primary.main' }}
                      >
                        【操作ガイド】3Dビューア
                      </Typography>
                    </Box>

                    <Divider />

                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                    >
                      <MouseIcon color="action" sx={{ mt: 0.3 }} />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 'medium', mb: 0.5 }}
                        >
                          地図の移動 / ズーム
                        </Typography>
                        {/* 💡 display="block" を sx={{ display: 'block' }} に修正 */}
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          ・移動：マウス左ドラッグ
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          ・ズーム：ホイール操作
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                    >
                      <MouseIcon color="primary" sx={{ mt: 0.3 }} />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 'medium', mb: 0.5 }}
                        >
                          角度（ピッチ・方位角）の変更
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          ・マウスの右ドラッグ
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          （または Ctrl + 左ドラッグ）
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>

                  {/* 📱 スマホ向け操作ガイド */}
                  <Stack
                    spacing={2.5}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 'bold', color: 'primary.main' }}
                      >
                        【操作ガイド】タッチ操作
                      </Typography>
                    </Box>

                    <Divider />

                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                    >
                      <TouchAppIcon color="action" sx={{ mt: 0.3 }} />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 'medium', mb: 0.5 }}
                        >
                          地図の移動 / ズーム
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          ・移動：1本指でドラッグ
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          ・ズーム：2本指でピンチイン / ピンチアウト
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                    >
                      <TouchAppIcon color="primary" sx={{ mt: 0.3 }} />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 'medium', mb: 0.5 }}
                        >
                          角度・回転の変更
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block' }}
                        >
                          ・2本指で同じ方向にドラッグ（傾き変更）
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          ・2本指でねじるように回転（方位角変更）
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Section>
      </Box>
    </>
  );
}
