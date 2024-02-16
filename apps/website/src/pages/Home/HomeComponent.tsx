import { Grid } from '@mui/material';
import { Fade, Slide } from 'react-awesome-reveal';
import { IProjectEntity } from '@codestz/core';
import { About, Landing, Projects, Technologies } from './components/';
import styles from './Home.module.scss';

export default function HomeComponent({ projects }: { projects?: Array<IProjectEntity> }) {
  return (
    <Grid container className={styles['container']} spacing={8}>
      <Grid item xs={8}>
        <Landing />
      </Grid>
      <Grid item xs={8} mt={8}>
        <Fade big>
          <About />
        </Fade>
      </Grid>
      <Grid item xs={8} mt={8}>
        <Slide direction="up">
          <Technologies />
        </Slide>
      </Grid>
      <Grid item xs={8} mt={8}>
        <Projects projects={projects} />
      </Grid>
    </Grid>
  );
}
