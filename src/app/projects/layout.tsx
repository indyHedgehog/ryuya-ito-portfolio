// app/project/layout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Container, Button } from '@mui/material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      {/* ─── 共通コンテンツ（各page.tsxの中身がここに入ります） ─── */}
      {children}

      {/* ─── 共通パーツ：Topボタン（どこにページを作っても自動で表示） ─── */}
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 'auto', md: 32 },
          bottom: { xs: 32, md: 'auto' },
          left: { xs: 'auto', md: 32 },
          right: { xs: 32, md: 'auto' },
          zIndex: 1000,
        }}
      >
        <Link href="/" passHref style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={
              <SettingsBackupRestoreIcon
                sx={{ display: { xs: 'none', md: 'block' } }}
              />
            }
            endIcon={
              <SettingsBackupRestoreIcon
                sx={{ display: { xs: 'block', md: 'none' } }}
              />
            }
            sx={{
              fontWeight: 'bold',
              px: 3,
              py: 1.5,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: 'background.paper',
              color: 'text.primary',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'action.hover',
                boxShadow: 4,
              },
            }}
          >
            Top
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
