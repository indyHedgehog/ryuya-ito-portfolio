// components/projects/ProjectHeader.tsx
'use client';

import React from 'react';
import { Container, Typography, Box, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CodeIcon from '@mui/icons-material/Code';

interface ProjectHeaderProps {
  title: string;
  context: string;
  period: string;
  summary: string;
  imageUrl?: string;
  technologies: string[];
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  context,
  period,
  summary,
  imageUrl,
  technologies,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        pt: { xs: 4, md: 8 },
        pb: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="md">
        {imageUrl && (
          <Box sx={{ width: '100%', maxHeight: '280px', display: 'flex', justifyContent: 'center', mb: 4, overflow: 'hidden' }}>
            <Box
              component="img"
              src={imageUrl}
              alt={title}
              sx={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '260px',
                objectFit: 'contain',
                borderRadius: 4,
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            />
          </Box>
        )}

        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '2rem', md: '2.75rem' } }}>
          {title}
        </Typography>

        <Typography variant="body1" sx={{ display: 'block', mb: 2, color: 'primary.main', fontWeight: 700, fontSize: { xs: '1rem', md: '1.1rem' }, letterSpacing: '0.02em' }}>
          {context}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, color: 'text.secondary' }}>
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 500, letterSpacing: '0.05em' }}>
            {period}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 2, color: 'text.primary', mb: 4 }}>
          {summary}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mr: 1 }}>
            <CodeIcon fontSize="small" />
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>TECH STACK</Typography>
          </Box>
          {technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{ backgroundColor: 'background.paper', border: '1px solid rgba(0,0,0,0.08)', fontWeight: 600, color: 'text.secondary', px: 0.5 }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};