import { Grid } from '@mui/material';
import { Fade } from 'react-awesome-reveal';
import { About, Landing } from './components/';
import styles from './Home.module.scss';

export default function HomeComponent() {
  return (
    <Grid container className={styles['container']} spacing={8}>
      <Grid item xs={8}>
        <Fade big>
          <Landing />
        </Fade>
      </Grid>
      <Grid item xs={8} mt={8}>
        <Fade big>
          <About />
        </Fade>
      </Grid>
    </Grid>
  );
}
