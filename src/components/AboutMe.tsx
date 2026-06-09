'use client';

import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';

// 飛び出させるSVGアイコンのパス・形状を定義する配列
const LAUNCHABLE_SVGS = [
  <Box
    component="img"
    src="/images/animation/training.svg"
    alt="icon1"
    sx={{ width: 36, height: 36 }}
  />,
  <Box
    component="img"
    src="/images/animation/plant.svg"
    alt="icon1"
    sx={{ width: 36, height: 36 }}
  />,
  <Box
    component="img"
    src="/images/animation/cloth.svg"
    alt="icon1"
    sx={{ width: 36, height: 36 }}
  />,
];

// アイコン1個体の物理状態の型定義
interface Particle {
  id: number;
  x: number; // 現在のX座標 (px)
  y: number; // 現在のY座標 (px)
  vx: number; // X軸の速度 (水平移動)
  vy: number; // Y軸の速度 (初速はマイナス＝上向き、重力でプラスへ)
  rotation: number; // 現在の回転角
  vRotation: number; // 回転速度
  svgIndex: number; // どのSVGを使うか
}

export const AboutMe: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  // 💡 2. 物理演算のループ処理（重力シミュレーション）
  useEffect(() => {
    if (particles.length === 0) return;

    const gravity = 0.4; // 重力の強さ（下に引っ張る力）
    const windowHeight = window.innerHeight;

    const id = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + gravity, // 重力で下方向の速度を加速
            rotation: p.rotation + p.vRotation,
          }))
          // 画面の下端（または余裕を見て下端+100px）を超えたら配列から削除
          .filter((p) => p.y < windowHeight + 100),
      );
    });

    return () => cancelAnimationFrame(id);
  }, [particles]);

  // 💡 3. クリックした瞬間にアイコンを生成して射出する関数
  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // クリックされた絶対座標を取得
    const clickX = e.clientX;
    const clickY = e.clientY;

    // 1回のクリックで飛び出す個数（例: 3〜5個連射すると派手になります）
    const isJackpot = Math.random() < 0.05; // 0.05 = 5%
    const burstCount = isJackpot ? 10 : 1;
    const newParticles: Particle[] = [];

    for (let i = 0; i < burstCount; i++) {
      // 斜め上（左上〜右上）に向かうランダムな初速を設計
      // vx: -4〜+4 (左右のブレ)
      // vy: -8〜-14 (上に打ち上げる負の初速)
      const vx = (Math.random() - 0.5) * 5;
      const vy = -(Math.random() * 4 + 5);
      const vRotation = (Math.random() - 0.5) * 10; // 回転のランダム速度
      const svgIndex = Math.floor(Math.random() * LAUNCHABLE_SVGS.length);

      newParticles.push({
        id: Date.now() + Math.random(), // 固有ID
        x: clickX,
        y: clickY,
        vx,
        vy,
        rotation: Math.random() * 360,
        vRotation,
        svgIndex,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
  };

  return (
    // 全体を包むコンテナにクリックイベントを付与
    <Box
      onClick={handleBoxClick}
      sx={{
        position: 'relative',
        width: '100%',
        cursor: 'pointer', // クリックできることを伝えるポインター
        userSelect: 'none',
        // ホバーした時に少しだけ浮き上がらせる遊び心を追加
        '&:hover > Box img, &:hover .profile-avatar': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        '& img': {
          transition: 'transform 0.3s ease, shadow 0.3s ease',
        },
      }}
    >
      {/* ─── 4. 飛び出すSVGアイコンたちのレンダリング用レイヤー（画面全体に固定） ─── */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none', // 下のコンテンツのクリックを絶対に邪魔しない
          zIndex: 9999, // 最前面で綺麗に落っこちるようにする
        }}
      >
        {particles.map((p) => (
          <Box
            key={p.id}
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              // 計算された物理座標（x, y）と回転（rotate）を適用
              transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`,
              willChange: 'transform', // ブラウザのハードウェア加速を有効にしてヌルヌル動かす
            }}
          >
            {LAUNCHABLE_SVGS[p.svgIndex]}
          </Box>
        ))}
      </Box>
      {/* ─────────────────────────────────────────────────────────────────── */}

      {/* 既存のレイアウト（写真・テキストエリア） */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'center' },
          gap: { xs: 4, md: 5 },
        }}
      >
        {/* 左側：顔写真 */}
        <Box
          component="img"
          src="/images/me.webp"
          alt="Ryuya Ito"
          sx={{
            width: { xs: 160, md: 200 },
            objectFit: 'cover',
            borderRadius: 1,
            boxShadow: 2,
          }}
        />

        {/* 右側：自己紹介テキスト */}
        <Box
          sx={{
            flex: 1,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Grid container spacing={1}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.2rem', lineHeight: 2.8, fontWeight: 'bold' }}
            >
              伊藤 竜矢 （2001年生まれ）
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.1rem', lineHeight: 2.3 }}
            >
              システムエンジニアとして上流工程からフロントエンドの実装、UI/UXデザインまで幅広く携わっています。
              React, TypeScript, MUI
              などのモダンな技術スタックを用いた、ユーザーが直感的に操作できる画面設計と、堅牢なコンポーネント開発を得意としています。
            </Typography>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
