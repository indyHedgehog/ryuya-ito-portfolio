'use client';

import React, { useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import { Container, Box, Typography, Paper } from '@mui/material';
import maplibregl from 'maplibre-gl';
import * as THREE from 'three';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { Section } from '@/components/Section';
import { projectsData } from '@/data/projectsData';
import 'maplibre-gl/dist/maplibre-gl.css';

interface ThreeCustomLayer extends maplibregl.CustomLayerInterface {
  camera?: THREE.Camera;
  scene?: THREE.Scene;
  renderer?: THREE.WebGLRenderer;
  map?: maplibregl.Map;
}

export default function DigitalTwinPlatformPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const project = projectsData.find((p) => p.id === 'digital-twin-platform');

  if (!project) {
    notFound();
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // 💡 東京・丸の内周辺の座標（PLATEAU 3Dモデルを配置する想定の基準点）
    const mapOrigin = [139.7671, 35.6812];
    const mapAltitude = 0;

    // MapLibreのカメラ行列とThree.jsの空間を同期させるための数理設定
    const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
      mapOrigin as [number, number],
      mapAltitude,
    );

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    // 1. MapLibre 地図の初期化
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          'osm-tiles': {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm-layer',
            type: 'raster',
            source: 'osm-tiles',
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: mapOrigin as [number, number],
      zoom: 16,
      pitch: 60, // 最初から傾きをつけて3D感を演出
      bearing: -20,
    });

    mapRef.current = map;

    // 2. Three.js を埋め込むカスタムレイヤーの定義
    const customLayer: ThreeCustomLayer = {
      id: '3d-model-layer',
      type: 'custom',
      renderingMode: '3d',
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // ライティング（3D都市モデルが綺麗見えるように環境光と平行光源を追加）
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        // 💡 プレースホルダー：3Dモデルがない場合の赤い立方体
        const geometry = new THREE.BoxGeometry(30, 30, 100);
        const material = new THREE.MeshStandardMaterial({ color: 0xff4444 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0, 50); // 地面に接地させる
        this.scene.add(cube);

        this.map = map;
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });
        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          0,
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          0,
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          0,
        );

        const m = new THREE.Matrix4().fromArray(matrix as unknown as number[]);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ,
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale,
            ),
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera!.projectionMatrix = m.multiply(l);
        this.renderer!.resetState();
        this.renderer!.render(this.scene!, this.camera!);
        this.map!.triggerRepaint();
      },
    };

    // 地図のスタイル読み込み完了後に3Dレイヤーを追加
    map.on('style.load', () => {
      map.addLayer(customLayer);
    });

    // 💡 PC版サイズ変形時の描画崩れを防ぐResizeObserverの設置
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, []);

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
        <Section title="3D都市モデリング・デモ">
          <Container maxWidth="md" sx={{ pb: 8 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6 }}
            >
              MapLibre GL JS のレンダリングコンテキストに Three.js の WebGL
              コンテキストを統合した WebGIS デモです。
              <strong>【マウスの右ドラッグ】または【Ctrl + ドラッグ】</strong>
              で、地図全体のピッチ（傾き）や方位角を自由に変更し、3D空間を周回することができます。
            </Typography>

            {/* 💡 スタイルをPC版向けに最適化した地図を表示するキャンバスコンテナ */}
            <Paper
              elevation={3}
              sx={{
                width: { xs: '100%', md: '70%' }, // 💡 PC(md)以上で横幅を7割に制限
                aspectRatio: { xs: 'unset', md: '4 / 3' }, // 💡 PC(md)以上で4:3の比率を指定
                height: { xs: '400px', md: 'auto' }, // 💡 比率維持のためPC版は高さauto
                mx: 'auto', // 💡 縮小した地図コンポーネントを中央に配置
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}
            >
              <Box
                ref={mapContainerRef}
                sx={{ width: '100%', height: '100%' }}
              />
            </Paper>
          </Container>
        </Section>
      </Box>
    </>
  );
}
