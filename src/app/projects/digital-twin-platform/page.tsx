'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { Container, Box, Typography, Paper } from '@mui/material';
import maplibregl from 'maplibre-gl';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { Section } from '@/components/Section';
import { projectsData } from '@/data/projectsData';
import { MapComponent } from '../../../components/mapComponent/MapComponent';
import { AddPolygonLayer } from '../../../components/mapComponent/AddPolygonLayer';

export default function DigitalTwinPlatformPage() {
  // 子コンポーネント間でMapLibreのインスタンスを共有するためのState
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
        <Section title="都市モデリング・デモ">
          <Container maxWidth="md" sx={{ pb: 8 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              MapLibre GL JS を用いて、地図上に GeoJSON
              形式のポリゴン（赤い多角形の面データ）をレンダリングした WebGIS
              デモです。
              <strong>【マウスの右ドラッグ】または【Ctrl + ドラッグ】</strong>
              で、地図のピッチ（傾き）や方位角を自由に変更し、俯瞰的な視点からポリゴンデータの配置を確認することができます。
            </Typography>

            {/* 地図コンポーネントの外枠コンテナ（サイズ設計はここで一元管理） */}
            <Paper
              elevation={3}
              sx={{
                width: { xs: '100%', md: '70%' },
                aspectRatio: { xs: 'unset', md: '4 / 3' },
                height: { xs: '400px', md: 'auto' },
                mx: 'auto',
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              {/* 💡 地図レイヤーの表示・初期化を担当 */}
              <MapComponent onMapReady={setMapInstance}>
                <AddPolygonLayer
                  map={mapInstance}
                  geoJsonPath="/data/tokyo.geojson"
                />
              </MapComponent>
            </Paper>
          </Container>
        </Section>
      </Box>
    </>
  );
}
