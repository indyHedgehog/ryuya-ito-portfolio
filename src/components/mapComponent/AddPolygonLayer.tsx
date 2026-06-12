'use client';

import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

// ==========================================
// 1. ポリゴンデータのパラメータ（色、透明度、立体高さなど）定義
// ==========================================
const POLYGON_CONFIG = {
  sourceId: 'geojson-polygon-source',
  layerId: 'geojson-polygon-layer',

  // ポリゴンの見た目の設定
  styles: {
    fillColor: '#ff4444', // ポリゴンの塗りつぶし色（鮮やかな赤）
    fillOpacity: 0.5, // 不透明度（0.0 ～ 1.0）
    outlineColor: '#ff0000', // 輪郭線の色

    // 💡 もしポリゴンを「ビル」のように3Dに押し出したい場合はここを設定
    // ※今回はMapLibre標準のfillレイヤーで実装していますが、
    //   typeを'fill-extrusion'に変えるだけで簡単に3Dポリゴン化できます。
    extrusionHeight: 50,
  },
};

// ==========================================
// 2. Props 定義（GeoJSONファイル のパス）
// ==========================================
interface AddPolygonLayerProps {
  /** MapLibreの地図インスタンス */
  map: maplibregl.Map | null;
  /** レイヤーに表示するGeoJSONファイルのパス（必須） */
  geoJsonPath?: string;
}

// ==========================================
// 3. AddPolygonLayer 定義
// ==========================================
export function AddPolygonLayer({ map, geoJsonPath }: AddPolygonLayerProps) {
  useEffect(() => {
    if (!map) return;

    // ==========================================
    // 4. モデル（データ）がないときのエラーハンドリング
    // ==========================================
    const isValidPath = geoJsonPath && geoJsonPath.endsWith('.geojson');

    if (!isValidPath) {
      console.warn(
        'モデルが見つかりません（Props にパスがわたっていない、またはパスが間違っています）',
      );
      return;
    }

    // 💡 MapLibreネイティブのGeoJSONソースとレイヤーを追加する処理
    try {
      // ① GeoJSONを取得するための「Source（データ水源）」を定義
      map.addSource(POLYGON_CONFIG.sourceId, {
        type: 'geojson',
        data: geoJsonPath, // ローカルまたはリモートのURLをそのまま渡せます
      });

      // ② ソースを元に地図上に描画する「Layer（表現方法）」を追加
      map.addLayer({
        id: POLYGON_CONFIG.layerId,
        type: 'fill', // 2Dポリゴン描画（面）
        source: POLYGON_CONFIG.sourceId,
        layout: {},
        paint: {
          'fill-color': POLYGON_CONFIG.styles.fillColor,
          'fill-opacity': POLYGON_CONFIG.styles.fillOpacity,
          'fill-outline-color': POLYGON_CONFIG.styles.outlineColor,
        },
      });

      console.log(`GeoJSONポリゴンレイヤーをロードしました: ${geoJsonPath}`);
    } catch (error) {
      console.error('レイヤーの追加中にエラーが発生しました:', error);
    }

    // クリーンアップ（コンポーネントが消える時に地図からソースとレイヤーを削除）
    return () => {
      if (map.getLayer(POLYGON_CONFIG.layerId)) {
        map.removeLayer(POLYGON_CONFIG.layerId);
      }
      if (map.getSource(POLYGON_CONFIG.sourceId)) {
        map.removeSource(POLYGON_CONFIG.sourceId);
      }
    };
  }, [map, geoJsonPath]);

  // ロジック管理専用のためUIはレンダリングしない
  return null;
}
