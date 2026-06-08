'use client';

import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
} from '@mui/material';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

// 1. 単体のカードコンポーネント（関心事はカードの内側だけ）
export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card
      sx={{ maxWidth: '100%', width: '100%', borderRadius: 3, boxShadow: 2 }}
    >
      <CardActionArea
        component={Link}
        href={`/projects/${project.id}`}
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

// 2. ★新しく追加：リストとして並べるためのコンポーネント
// Grid のレイアウト構造やループ処理（map）をここに閉じ込めます
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
