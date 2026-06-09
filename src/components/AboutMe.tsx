'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography } from '@mui/material';

// 💡 変更：軽量化のため、MUIのBoxではなく、ネイティブの「img」タグに変更
const LAUNCHABLE_SVGS = [
  <img
    src="/images/animation/training.svg"
    alt="icon1"
    style={{ width: 36, height: 36, display: 'block' }}
  />,
  <img
    src="/images/animation/plant.svg"
    alt="icon2"
    style={{ width: 36, height: 36, display: 'block' }}
  />,
  <img
    src="/images/animation/cloth.svg"
    alt="icon3"
    style={{ width: 36, height: 36, display: 'block' }}
  />,
];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRotation: number;
  svgIndex: number;
}

type RocketStatus = 'idle' | 'launch' | 'descend';

export const AboutMe: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [energy, setEnergy] = useState<number>(0);
  const [rocketStatus, setRocketStatus] = useState<RocketStatus>('idle');

  const MAX_ENERGY = 40;

  // 💡 対策：常に最新のparticlesをアニメーションループ内で安全に参照するためのRef
  const particlesRef = useRef<Particle[]>([]);
  useEffect(() => {
    particlesRef.current = particles;
  }, [particles]);

  // 💡 1. 【劇的改善】物理演算のループ処理（マウント時に1つだけ起動する完全シングルループ）
  useEffect(() => {
    const gravity = 0.22;
    let animationFrameId: number;

    const updatePhysics = () => {
      // 画面にパーティクルがなければ計算をスキップして次のフレームへ
      if (particlesRef.current.length === 0) {
        animationFrameId = requestAnimationFrame(updatePhysics);
        return;
      }

      const windowHeight = window.innerHeight;

      // 関数型の更新（Functional Update）を使い、最新の配列を一括処理
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + gravity,
            rotation: p.rotation + p.vRotation,
          }))
          .filter((p) => p.y < windowHeight + 100),
      );

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    // ループ開始
    animationFrameId = requestAnimationFrame(updatePhysics);

    // アンマウント時に確実に1つだけあるタイマーを殺す
    return () => cancelAnimationFrame(animationFrameId);
  }, []); // 依存配列を空にすることで、タイマーの多重起動（増殖）を完全に防止！

  // 💡 2. ロケットアニメーションのタイムライン制御
  useEffect(() => {
    if (rocketStatus === 'launch') {
      const timer = setTimeout(() => {
        setRocketStatus('descend');
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (rocketStatus === 'descend') {
      const timer = setTimeout(() => {
        setRocketStatus('idle');
        setEnergy(0);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [rocketStatus]);

  // 💡 3. クリック時のアイコン生成 & エナジーチャージ
  const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rocketStatus !== 'idle') return;

    const clickX = e.clientX;
    const clickY = e.clientY;

    const isJackpot = Math.random() < 0.05;
    const burstCount = isJackpot ? 10 : 1;
    const newParticles: Particle[] = [];

    const gainedEnergy = isJackpot ? 10 : 1;
    const nextEnergy = Math.min(energy + gainedEnergy, MAX_ENERGY);
    setEnergy(nextEnergy);

    if (nextEnergy >= MAX_ENERGY) {
      setRocketStatus('launch');
    }

    for (let i = 0; i < burstCount; i++) {
      const vx = (Math.random() - 0.5) * 5;
      const vy = -(Math.random() * 4 + 5);
      const vRotation = (Math.random() - 0.5) * 4;
      const svgIndex = Math.floor(Math.random() * LAUNCHABLE_SVGS.length);

      newParticles.push({
        id: Date.now() + Math.random() + i,
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

  const energyPercent = (energy / MAX_ENERGY) * 100;

  return (
    <Box
      onClick={handleBoxClick}
      sx={{
        position: 'relative',
        width: '100%',
        cursor: rocketStatus === 'idle' ? 'pointer' : 'default',
        userSelect: 'none',
        '@keyframes rocketUp': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 1 },
          '30%': { transform: 'translateY(10px) scaleY(0.95)' },
          '100%': { transform: 'translateY(-120vh) scaleY(1.2)', opacity: 0.8 },
        },
        '@keyframes parachuteDown': {
          '0%': { transform: 'translateY(-100vh) rotate(8deg)', opacity: 0 },
          '5%': { opacity: 1 },
          '20%': { transform: 'translateY(-75vh) rotate(-8deg)' },
          '40%': { transform: 'translateY(-50vh) rotate(6deg)' },
          '60%': { transform: 'translateY(-30vh) rotate(-5deg)' },
          '80%': { transform: 'translateY(-12vh) rotate(3deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        },
      }}
    >
      {/* 落下パーティクルレイヤー */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      >
        {particles.map((p) => (
          <Box
            key={p.id}
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`,
              willChange: 'transform',
            }}
          >
            {LAUNCHABLE_SVGS[p.svgIndex]}
          </Box>
        ))}
      </Box>

      {/* 自己紹介レイアウトセクション */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 4 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* 顔写真コンテナ */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: 160, md: 200 },
              height: 'auto', // ★ auto から 200px (固定値) に戻してアスペクト比を維持
              borderRadius: 1,
              boxShadow: rocketStatus === 'idle' ? 2 : 6,
              overflow: 'visible',
              animation:
                rocketStatus === 'launch'
                  ? 'rocketUp 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards'
                  : rocketStatus === 'descend'
                    ? 'parachuteDown 5.5s cubic-bezier(0.28, 0.84, 0.42, 1) forwards'
                    : 'none',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform:
                  rocketStatus === 'idle' ? 'translateY(-4px)' : 'none',
              },
            }}
          >
            {rocketStatus === 'descend' && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -45,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '2.2rem',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
                  animation: 'pulse 1s infinite alternate',
                }}
              >
                🪂
              </Box>
            )}

            <Box
              component="img"
              src="/images/me.webp"
              alt="Ryuya Ito"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 1,
                pointerEvents: 'none',
              }}
            />
          </Box>

          {/* ⚡ 縦型エナジーメーター ⚡ */}
          <Box
            sx={{
              width: 14,
              height: { xs: 160, md: 200 },
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '10px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: `${energyPercent}%`,
                background:
                  energy >= MAX_ENERGY
                    ? 'linear-gradient(to top, #FF9800, #F44336)'
                    : 'linear-gradient(to top, #2196F3, #00BCD4)',
                borderRadius: 'inherit',
                transition:
                  'height 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease',
                animation:
                  energy >= 30 && rocketStatus === 'idle'
                    ? 'shake 0.15s infinite'
                    : 'none',
              }}
            />

            <style jsx global>{`
              @keyframes shake {
                0% {
                  transform: translateX(0);
                }
                50% {
                  transform: translateX(0.8px);
                }
                100% {
                  transform: translateX(0);
                }
              }
            `}</style>
          </Box>
        </Box>

        {/* 右側：自己紹介テキスト */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
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
