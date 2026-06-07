'use client';

import React from 'react';
import { Box, Typography, Stack, Link as MuiLink } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';

export const Contact: React.FC = () => {
  return (
    <Box
      sx={{
        py: 6,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        mt: 8,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Contact
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 2,
          justifyContent: 'center', // sxの中に移動
          alignItems: 'center', // sxの中に移動
        }}
      >
        <MuiLink
          href="mailto:ryuya20011108@gmail.com"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
          }}
        >
          <EmailIcon color="primary" /> ryuya20011108@gmail.com
        </MuiLink>

        <MuiLink
          href="https://instagram.com/_50y.ka_
"
          target="_blank"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
          }}
        >
          <InstagramIcon color="secondary" /> @_50y.ka_
        </MuiLink>

        <MuiLink
          href="tel:08084717774"
          color="inherit"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
          }}
        >
          <PhoneIcon sx={{ color: 'green' }} /> 080-8471-7774
        </MuiLink>
      </Stack>
    </Box>
  );
};
