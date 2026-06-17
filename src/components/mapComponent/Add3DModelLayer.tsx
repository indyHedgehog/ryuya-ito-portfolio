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
  /** * モデルのパス（省略された場合はデフォルトのアンテナモデルを表示）
   */
  modelPath?: string;
}

interface ThreeCustomLayer extends maplibregl.CustomLayerInterface {
  camera: THREE.Camera | null;
  scene: THREE.Scene | null;
  renderer: THREE.WebGLRenderer | null;
  mapInstance: maplibregl.Map | null;
}

// デフォルトのアンテナモデルのURL
const DEFAULT_ANTENNA_MODEL =
  'https://maplibre.org/maplibre-gl-js/docs/assets/34M_17/34M_17.gltf';

export function Add3DModelLayer({
  map,
  modelOrigin,
  modelAltitude = 0,
  modelPath,
}: Add3DModelLayerProps) {
  const layerId = 'custom-3d-model-layer';
  const layerRef = useRef<ThreeCustomLayer | null>(null);

  // modelPath が指定されていればそれを使い、無ければデフォルトのアンテナを使う
  const resolvedModelPath = modelPath || DEFAULT_ANTENNA_MODEL;

  useEffect(() => {
    if (!map) return;

    if (map.getLayer(layerId)) {
      map.removeLayer(layerId);
    }

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

        // ライティング
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // 決定されたパス（個別モデル or アンテナモデル）をロード
        const loader = new GLTFLoader();
        loader.load(
          resolvedModelPath,
          (gltf) => {
            if (this.scene) {
              this.scene.add(gltf.scene);
            }
          },
          undefined,
          (error) => {
            console.error(
              `Failed to load 3D model from: ${resolvedModelPath}`,
              error,
            );
          },
        );

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

        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.mapInstance.triggerRepaint();
      },
    };

    layerRef.current = customLayer;
    map.addLayer(customLayer);

    return () => {
      if (map && map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }

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
  }, [map, resolvedModelPath, modelOrigin, modelAltitude]); // 依存配列に resolvedModelPath を指定

  return null;
}
