import { Box, Grid } from '@mui/material';
import { Slide } from 'react-awesome-reveal';
import { TranslatableText } from '@codestz/common-ui';
import { TechnologiesIcons } from '../../../../assets/icons';
import styles from './Technologies.module.scss';

export function Technologies() {
  return (
    <Grid className={styles['container']} container spacing={8}>
      <Grid item xs={10}>
        <Box display={'flex'} justifyContent={'center'}>
          <TranslatableText textAlign={'center'} variant="h1">
            technologies
          </TranslatableText>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className={styles['technologies']}>
          {Object.entries(TechnologiesIcons).map(([key, Icon]) => (
            <Slide direction="up" className={styles['tech']} key={key}>
              <Icon />
            </Slide>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
