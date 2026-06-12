'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// ==========================================
// 1. 初期位置の定義
// ==========================================
// 東京駅丸の内中央口付近の [経度, 緯度]
const MAP_INITIAL_CENTER: [number, number] = [139.7661, 35.6813];
const MAP_INITIAL_ZOOM = 16;
const MAP_INITIAL_PITCH = 60; // 3D感を演出するための傾き
const MAP_INITIAL_BEARING = -20; // 方位角

// ==========================================
// 2. OpenStreetMap のスタイル定義
// ==========================================
const OSM_MAP_STYLE: maplibregl.StyleSpecification = {
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
};

// ==========================================
// 3. Props の type 定義 (children)
// ==========================================
interface MapComponentProps {
  /** 地図初期化完了時に、生成されたインスタンスを親に渡すためのコールバック */
  onMapReady: (map: maplibregl.Map) => void;
  /** 地図内部にマウントする3Dレイヤー等の子コンポーネント */
  children?: React.ReactNode;
}

// ==========================================
// 4. MapComponent の定義
// ==========================================
export function MapComponent({ onMapReady, children }: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // MapLibreの初期化
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: OSM_MAP_STYLE,
      center: MAP_INITIAL_CENTER,
      zoom: MAP_INITIAL_ZOOM,
      pitch: MAP_INITIAL_PITCH,
      bearing: MAP_INITIAL_BEARING,
    });

    // スタイルの読み込みが完了したタイミングで通知
    map.on('style.load', () => {
      onMapReady(map);
      setIsMapLoaded(true);
    });

    // 親コンテナのリサイズを監視してCanvasサイズを自動追従
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(mapContainerRef.current);

    // クリーンアップ処理
    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, [onMapReady]);

  return (
    <Box
      ref={mapContainerRef}
      sx={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {/* 💡 地図の初期化（スタイルロード）が完了した後にのみ、子コンポーネント(3Dレイヤーなど)をレンダリングする */}
      {isMapLoaded && children}
    </Box>
  );
}
