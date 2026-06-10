'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // 💡 全プロジェクトをクリック可能にするため isClickable 判定条件を常に true に変更、または撤去
  return (
    <Card
      sx={{
        maxWidth: '100%',
        width: '100%',
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/projects/${project.id}`} // 💡 常に詳細リンクを有効化
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'flex-start',
          p: { xs: 2, sm: 3 },
        }}
      >
        <CardMedia
          component="img"
          image={project.imageUrl}
          alt={project.title}
          sx={{
            width: { xs: '100%', sm: 200 },
            height: 140,
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />

        <CardContent
          sx={{ flex: 1, pl: { xs: 0, sm: 4 }, pt: { xs: 2, sm: 0 } }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="caption"
            color="primary.main"
            sx={{
              display: 'block',
              mb: 1.5,
              fontWeight: 600,
              letterSpacing: '0.04em',
              fontSize: '0.75rem',
            }}
          >
            {project.context}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.6 }}
          >
            {project.summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface ProjectListProps {
  projects: Project[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <Grid container spacing={4}>
      {projects.map((project) => (
        <Grid key={project.id} size={{ xs: 12 }}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
};
