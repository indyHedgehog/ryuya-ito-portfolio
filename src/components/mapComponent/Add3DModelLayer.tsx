'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface Add3DModelLayerProps {
  /** MapLibreのインスタンス */
  map: maplibregl.Map | null;
  /** モデルを配置する [経度, 緯度] */
  modelOrigin: [number, number];
  /** モデルの標高（メートル） */
  modelAltitude?: number;
  /** モデルのパス（public配下の相対パス、または外部URL） */
  modelPath: string;
}

// 拡張インターフェース（MapLibreのCustomLayerInterfaceにThree.jsのプロパティを内包させる）
interface ThreeCustomLayer extends maplibregl.CustomLayerInterface {
  camera: THREE.Camera | null;
  scene: THREE.Scene | null;
  renderer: THREE.WebGLRenderer | null;
  mapInstance: maplibregl.Map | null;
}

export function Add3DModelLayer({
  map,
  modelOrigin,
  modelAltitude = 0,
  modelPath,
}: Add3DModelLayerProps) {
  // レイヤーの重複登録防止やクリーンアップのための参照
  const layerId = 'custom-3d-model-layer';
  const layerRef = useRef<ThreeCustomLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    // すでにレイヤーが存在する場合は一旦削除
    if (map.getLayer(layerId)) {
      map.removeLayer(layerId);
    }

    // 地図上の座標変換パラメータを計算
    const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude,
    );

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: Math.PI / 2,
      rotateY: 0,
      rotateZ: 0,
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    // カスタムレイヤーオブジェクトの定義
    const customLayer: ThreeCustomLayer = {
      id: layerId,
      type: 'custom',
      renderingMode: '3d',
      camera: null,
      scene: null,
      renderer: null,
      mapInstance: null,

      onAdd(mapInstance, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();
        this.mapInstance = mapInstance;

        // ライティングの設定
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // GLTFモデルのロード
        const loader = new GLTFLoader();
        loader.load(
          modelPath,
          (gltf) => {
            if (this.scene) {
              this.scene.add(gltf.scene);
            }
          },
          undefined,
          (error) => {
            console.error('Failed to load 3D model:', error);
          },
        );

        // MapLibreのCanvasとWebGLコンテキストをThree.jsと共有
        this.renderer = new THREE.WebGLRenderer({
          canvas: mapInstance.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },

      render(gl, args) {
        if (!this.camera || !this.scene || !this.renderer || !this.mapInstance)
          return;

        // 回転行列の作成
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX,
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY,
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ,
        );

        // MapLibreの射影行列を取得してThree.jsのカメラに同期
        const m = new THREE.Matrix4().fromArray(
          args.defaultProjectionData.mainMatrix,
        );
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

        this.camera.projectionMatrix = m.multiply(l);

        // WebGL状態のリセットとレンダリング
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.mapInstance.triggerRepaint();
      },
    };

    layerRef.current = customLayer;
    map.addLayer(customLayer);

    // クリーンアップ処理
    return () => {
      if (map && map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }

      // Three.jsのリソース解放 (メモリリーク対策)
      if (layerRef.current) {
        const scene = layerRef.current.scene;
        if (scene) {
          scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;
            object.geometry.dispose();

            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          });
        }
        layerRef.current.renderer?.dispose();
      }
    };
  }, [map, modelPath, modelOrigin, modelAltitude]);

  return null;
}
