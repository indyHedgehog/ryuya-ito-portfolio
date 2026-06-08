'use client';

import React, { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

interface SkillItem {
  name: string;
  icon: React.ReactNode;
}

const skillsData: SkillItem[] = [
  {
    name: 'Figma',
    icon: (
      <Box
        component="img"
        src="/images/icons/figma.svg"
        alt="Figma"
        sx={{
          width: 54,
          height: 54,
          transform: 'scale(2.0)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'MapLibre',
    icon: (
      <Box
        component="img"
        src="/images/icons/MapLibre.svg"
        alt="MapLibre"
        sx={{
          width: 42,
          height: 42,
          transform: 'scale(1.4)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'React',
    icon: (
      <Box
        component="img"
        src="/images/icons/React-icon.svg"
        alt="React"
        sx={{
          width: 42,
          height: 42,
          transform: 'scale(1.1)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <Box
        component="img"
        src="/images/icons/TypeScript.svg"
        alt="TypeScript"
        sx={{
          width: 42,
          height: 42,
          transform: 'scale(0.8)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'Material UI',
    icon: (
      <Box
        component="img"
        src="/images/icons/MUI.png"
        alt="Material UI"
        sx={{
          width: 42,
          height: 42,
          transform: 'scale(1.1)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'Three.js',
    icon: (
      <Box
        component="img"
        src="/images/icons/Threejs.svg"
        alt="Three.js"
        sx={{
          width: 42,
          height: 42,
          transform: 'scale(1.0)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'Adobe Illustrator',
    icon: (
      <Box
        component="img"
        src="/images/icons/Adobe_Illustrator.svg"
        alt="Adobe Illustrator"
        sx={{
          width: 42,
          height: 42,
          transform: 'scale(1.0)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'Autodesk Revit',
    icon: (
      <Box
        component="img"
        src="/images/icons/Aoutdesk.webp"
        alt="Autodesk Revit"
        sx={{
          width: 42,
          height: 42,
          transform: 'scale(0.8)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'Rhinoceros',
    icon: (
      <Box
        component="img"
        src="/images/icons/RhinoLogo.svg"
        alt="Rhinoceros"
        sx={{
          width: 42,
          height: 42,
          transform: 'scale(1.5)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
  {
    name: 'UX検定™基礎（HCD検®認定）',
    icon: (
      <Box
        component="img"
        src="/images/icons/UXtest.webp"
        alt="UX検定™基礎（HCD検®認定）"
        sx={{
          width: 42,
          height: 23,
          transform: 'scale(1.5)',
          pointerEvents: 'none',
        }}
      />
    ),
  },
];

export const SkillMagnet: React.FC = () => {
  const [exploded, setExploded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 💡 【新・重なり防止数式ロジック】
  const magnetPositions = useMemo(() => {
    return skillsData.map((_, index) => {
      // 1. 全体を均等な角度で円周上に分散配置
      const angle = (index / skillsData.length) * Math.PI * 2;

      // 2. スケール拡大に対応するため、ベースの半径を「72px」に拡張
      //    かつ、隣り合うアイコンが完全に直線上にならないよう、わずかに「ジグザグな揺らぎ（±6px）」を付与
      const baseRadius = 72;
      const radius = index % 2 === 0 ? baseRadius - 6 : baseRadius + 6;

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    });
  }, []);

  const handleContainerClick = () => {
    if (exploded) return;
    setExploded(true);

    setTimeout(() => {
      setExploded(false);
    }, 850);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* ─── メインのマグネットアニメーション領域 ─── */}
      <Box
        onClick={handleContainerClick}
        sx={{
          position: 'relative',
          width: '100%',
          height: '250px', // 高さは230pxを維持してゆったりホールド
          background: 'linear-gradient(145deg, #f8f9fa 0%, #f1f3f5 100%)',
          boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.02)',
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            zIndex: 0,
            pointerEvents: 'none',
            transformOrigin: 'center center',
          }}
          animate={
            exploded
              ? {
                  rotate: [0, -10, 8, -5, 3, -1, 0],
                  x: [0, -4, 4, -2, 1, 0],
                }
              : { rotate: 0, x: 0 }
          }
          transition={{
            duration: 0.5,
            ease: [0.08, 0.85, 0.2, 1],
          }}
        >
          <Typography
            variant="h1"
            component="div"
            sx={{
              color: 'primary.main',
              opacity: 0.14,
              fontWeight: '900',
              fontSize: { xs: '5.5rem', sm: '4.5rem', md: '5.5rem' },
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            <Box component="span" sx={{ display: { xs: 'block', md: 'none' } }}>
              Tap!!
            </Box>
            <Box component="span" sx={{ display: { xs: 'none', md: 'block' } }}>
              Click here!
            </Box>
          </Typography>
        </motion.div>
        <Box
          sx={{
            position: 'absolute',
            width: 2,
            height: 2,
            backgroundColor: 'transparent',
          }}
        />

        {/* ソニックブームエフェクト */}
        {/* 第1波（メイン・高速で巨大拡散） */}
        <motion.div
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '4px solid #2196F3', // 線の太さを 3px -> 4px に強化
            boxShadow: '0 0 30px #2196F3, inset 0 0 30px #2196F3',
            pointerEvents: 'none',
            zIndex: 5,
          }}
          animate={{
            scale: exploded ? [1, 8] : 1, // ★ 5 から 8 に最大サイズを拡大！
            opacity: exploded ? [0.9, 0] : 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.1, 0.8, 0.15, 1], // 初速をさらに鋭く
          }}
        />

        {/* 第2波（追従波・残像感と厚みを追加） */}
        <motion.div
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid #64B5F6', // 少し明るいライトブルーの細い線
            boxShadow: '0 0 20px #64B5F6',
            pointerEvents: 'none',
            zIndex: 4,
          }}
          animate={{
            scale: exploded ? [1, 6.5] : 1, // メインよりわずかに小さく拡散
            opacity: exploded ? [0.7, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.05, // ★ 0.05秒だけあえて遅らせて発射（これだけで立体感が劇変します）
            ease: 'easeOut',
          }}
        />

        {/* スキルアイコン展開 */}
        {skillsData.map((skill, index) => {
          const magnetPos = magnetPositions[index];
          const angle = (index / skillsData.length) * Math.PI * 2;

          const blastDistance = 100 + (index % 3) * 12;
          const blastX = Math.cos(angle) * blastDistance;
          const blastY = Math.sin(angle) * blastDistance;

          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={skill.name}
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: exploded ? 10 : isHovered ? 30 : 1,
              }}
              animate={{
                x: exploded ? blastX : magnetPos.x,
                y: exploded ? blastY : magnetPos.y,
                scale: exploded ? 1.25 : isHovered ? 1.12 : 1,
                rotate: exploded ? Math.random() * 80 - 40 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: exploded ? 450 : 130,
                damping: exploded ? 18 : 14,
                mass: 0.8,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  filter: isHovered
                    ? 'drop-shadow(0px 6px 12px rgba(0,0,0,0.22))'
                    : 'drop-shadow(0px 3px 6px rgba(0,0,0,0.1))',
                  transition: 'filter 0.3s ease',
                }}
              >
                {skill.icon}
              </Box>

              {/* PC用：ホバーテキスト */}
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 4 : -4,
                }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    px: 1.2,
                    py: 0.3,
                    borderRadius: '4px',
                    fontWeight: '700',
                    fontSize: '0.7rem',
                    boxShadow: 2,
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {skill.name}
                </Typography>
              </motion.div>
            </motion.div>
          );
        })}
      </Box>

      {/* スマホ版限定のリスト */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1,
          mt: 2,
          px: 1,
        }}
      >
        {skillsData.map((skill) => (
          <Typography
            key={skill.name}
            variant="caption"
            sx={{
              backgroundColor: '#f1f3f5',
              color: 'text.secondary',
              fontWeight: '600',
              fontSize: '0.75rem',
              px: 1.5,
              py: 0.6,
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.04)',
            }}
          >
            {skill.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
