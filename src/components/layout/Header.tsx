'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Fade,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navItems = [
  { label: 'Top', id: 'top' },
  { label: 'About Me', id: 'about-me' },
  { label: 'Works', id: 'works' },
  { label: 'Contact', id: 'contact' },
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // スクロール検知
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. 通常時（最上部）の横並びヘッダー */}
      {/* ★ 修正箇所：Slideを廃止し、スクロール時にその場でパッと消える（または不透明度で消える）ように変更 */}
      <Box
        component="nav"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          display: { xs: 'none', md: 'block' },
          opacity: trigger ? 0 : 1,
          visibility: trigger ? 'hidden' : 'visible',
          transition: 'opacity 0.3s ease, visibility 1.0s ease', // 滑らかに消える
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', gap: 4, pt: 3 }}>
          {navItems.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </Box>

      {/* 2. ★ 修正箇所：スクロール後に「ふわっと浮き上がる」ハンバーガーボタン */}
      <Fade in={trigger} timeout={400}>
        <Box
          sx={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 1200,
            // スマホ版では最初から表示
            display: { xs: 'block', md: trigger ? 'block' : 'none' },
            // スクロール時に少し下から上に浮き上がるアニメーションをCSSで付与
            transform: trigger ? 'translateY(0)' : 'translateY(12px)',
            transition:
              'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1) !important',
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: 'background.paper',
              boxShadow: 3, // 浮き上がり感を強調するために影を少し強めに（2から3へ）
              color: 'text.primary',
              p: 1.5,
              '&:hover': { backgroundColor: 'background.default' },
            }}
          >
            <MenuIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Fade>

      {/* 3. フルスクリーン・オーバーレイメニュー（変更なし） */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(30, 30, 30, 0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'absolute',
            top: 24,
            right: 24,
            color: 'common.white',
            p: 1.5,
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <List sx={{ textAlign: 'center' }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              sx={{
                py: 2,
                px: 6,
                borderRadius: 2,
                mb: 2,
                color: 'common.white',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
              }}
            >
              <ListItemText>
                <Typography
                  component="span" // インライン要素にしておくと安全です
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    display: 'block', // 綺麗に中央揃えを維持するため
                  }}
                >
                  {item.label}
                </Typography>
              </ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
};
