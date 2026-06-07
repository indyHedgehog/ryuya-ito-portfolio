'use client';

import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          My Portfolio
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary">
          React + TypeScript + MUI + pnpm
        </Typography>
      </Box>
    </Container>
  );
}