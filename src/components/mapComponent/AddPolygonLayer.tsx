'use client';

import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

// ==========================================
// 1. スタイル設定の分離（不変の見た目に関する定義）
// ==========================================
const POLYGON_STYLE_CONFIG = {
  fillColor: '#ff4444', // ポリゴンの塗りつぶし色（鮮やかな赤）
  fillOpacity: 0.5, // 不透明度
  outlineColor: '#ff0000', // 輪郭線の色
};

// ==========================================
// 2. Props 定義（geoJsonPath を必須化）
// ==========================================
interface AddPolygonLayerProps {
  /** MapLibreの地図インスタンス */
  map: maplibregl.Map | null;
  /** レイヤーに表示するGeoJSONファイルのパス（複数配置のため必須） */
  geoJsonPath: string;
}

/**
 * パス文字列から拡張子を除いたファイル名を抽出し、MapLibre用の安全なIDを生成する
 */
function generateIdFromPath(path: string): string {
  const baseName = path.split('/').pop() || 'default';
  // 拡張子を除去し、安全な文字のみ残す（記号のバグ防止）
  return baseName.replace(/\.geojson$/i, '').replace(/[^a-zA-Z0-9-_]/g, '_');
}

// ==========================================
// 3. AddPolygonLayer 定義
// ==========================================
export function AddPolygonLayer({ map, geoJsonPath }: AddPolygonLayerProps) {
  useEffect(() => {
    if (!map) return;

    // ファイル名から動的にソースIDとレイヤーIDを一意に生成
    const layerKey = generateIdFromPath(geoJsonPath);
    const sourceId = `source-${layerKey}`;
    const layerId = `layer-${layerKey}`;

    // 入力パスのバリデーション
    const isValidPath =
      geoJsonPath && geoJsonPath.toLowerCase().endsWith('.geojson');
    if (!isValidPath) {
      console.warn(
        `不正なGeoJSONパスが指定されました。処理をスキップします: ${geoJsonPath}`,
      );
      return;
    }

    try {
      // 既存のソースやレイヤーとの重複チェック（万が一の再レンダリング時のエラー抑止）
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
      if (map.getSource(sourceId)) {
        map.removeSource(sourceId);
      }

      // ① 動的IDを用いてGeoJSONソースを追加
      map.addSource(sourceId, {
        type: 'geojson',
        data: geoJsonPath,
      });

      // ② 動的IDを用いてレイヤーを追加（ファイル名がレイヤー名に反映される）
      map.addLayer({
        id: layerId,
        type: 'fill',
        source: sourceId,
        layout: {},
        paint: {
          'fill-color': POLYGON_STYLE_CONFIG.fillColor,
          'fill-opacity': POLYGON_STYLE_CONFIG.fillOpacity,
          'fill-outline-color': POLYGON_STYLE_CONFIG.outlineColor,
        },
      });

      console.log(`レイヤー [${layerId}] をロードしました: ${geoJsonPath}`);
    } catch (error) {
      console.error(
        `レイヤー [${layerId}] の追加中にエラーが発生しました:`,
        error,
      );
    }

    // クリーンアップ（コンポーネントのアンマウント時に該当の動的IDターゲットのみをピンポイント削除）
    return () => {
      if (!map) return;

      try {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
        console.log(`レイヤー [${layerId}] をクリーンアップしました。`);
      } catch (cleanUpError) {
        console.error(
          `レイヤー [${layerId}] のクリーンアップ中にエラーが発生しました:`,
          cleanUpError,
        );
      }
    };
  }, [map, geoJsonPath]);

  return null;
}
