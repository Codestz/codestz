import { Grid } from '@mui/material';
import { Slide } from 'react-awesome-reveal';
import { ProjectCard } from '@codestz/common-ui';
import { IProjectEntity } from '@codestz/core';

export function Projects({ projects }: { projects?: Array<IProjectEntity> }) {
  return (
    <Grid container spacing={8}>
      {projects?.map((project, i) => (
        <Grid item xs={12} key={project.Id}>
          <Slide direction={i % 2 === 0 ? 'left' : 'right'}>
            <ProjectCard
              leftImage={project?.LeftImage?.DownloadUrl || ''}
              primaryColor="#ffcddb"
              secondaryColor="#fefefe"
              rightImage={project?.RightImage?.DownloadUrl || ''}
              name={project.Name || ''}
              index={i}
              link={project.Link}
              description={project.Description}
            />
          </Slide>
        </Grid>
      ))}
    </Grid>
  );
}
