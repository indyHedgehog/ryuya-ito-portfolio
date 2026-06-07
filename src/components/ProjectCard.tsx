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
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      {/* リンク先を /projects/作品ID に設定 */}
      <CardActionArea
        component={Link}
        href={`/projects/${project.id}`}
        sx={{ height: '100%' }}
      >
        <CardMedia
          component="img"
          height="140"
          image={project.imageUrl}
          alt={project.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold' }}
          >
            {project.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
