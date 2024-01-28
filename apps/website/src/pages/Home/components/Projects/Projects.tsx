import { Grid } from '@mui/material';
import { Slide } from 'react-awesome-reveal';
import { ProjectCard } from '@codestz/common-ui';
import UlaulaLeft from '../../../../assets/images/ulaula-1.png';
import UlaulaRight from '../../../../assets/images/ulaula-2.png';

export function Projects() {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Slide>
          <ProjectCard
            leftImage={UlaulaLeft}
            primaryColor="#ffcddb"
            secondaryColor="#fefefe"
            rightImage={UlaulaRight}
            name={'ulaula'}
            index={1}
            link="https://ulaula.co"
          />
        </Slide>
      </Grid>
    </Grid>
  );
}
