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
import { Add3DModelLayer } from '../../../components/mapComponent/Add3DModelLayer';

// サンプルコードに基づく3Dモデルの初期配置（例：東京駅周辺、あるいはサンプル座標）
const MODEL_ORIGIN_LON_LAT: [number, number] = [139.7661, 35.6813]; // MapComponentの初期中心に同期
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
        <Section title="都市モデリング・デモ">
          <Container maxWidth="md" sx={{ pb: 8 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              MapLibre GL JS と Three.js を連携させ、地図上に GeoJSON
              ポリゴンデータおよび
              3Dモデル（GLTF）を同一のWebGLコンテキストで融合してレンダリングした
              WebGIS デモです。
              <strong>【マウスの右ドラッグ】または【Ctrl + ドラッグ】</strong>
              で、ピッチや方位角を傾け、俯瞰的な3D都市空間を確認できます。
            </Typography>

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
              <MapComponent onMapReady={setMapInstance}>
                {/* 既存のポリゴンレイヤー */}
                <AddPolygonLayer
                  map={mapInstance}
                  geoJsonPath="/data/tokyo.geojson"
                />

                {/* 新規追加の3Dモデルレイヤー */}
                <Add3DModelLayer
                  map={mapInstance}
                  modelOrigin={MODEL_ORIGIN_LON_LAT}
                  modelPath={MODEL_FILE_PATH}
                />
              </MapComponent>
            </Paper>
          </Container>
        </Section>
      </Box>
    </>
  );
}
