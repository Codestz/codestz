import { Box, Button, Grid } from '@mui/material';
import { FaRegFilePdf } from 'react-icons/fa6';
import { TranslatableText } from '@codestz/common-ui';
import Me from '../../../../assets/images/me.jpeg';
import styles from './About.module.scss';

export function About() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <Box className={styles['picture']}>
              <img style={{ width: '100%' }} loading="lazy" src={Me} alt={'me_picture'} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display={'flex'} flexDirection={'column'} gap={4}>
              <TranslatableText variant="h2">aboutMe.title</TranslatableText>
              <TranslatableText variant="body1" fontWeight={400}>
                aboutMe.description
              </TranslatableText>
              <Box display={'flex'} justifyContent={'center'}>
                <Button
                  className={styles['cvBtn']}
                  endIcon={<FaRegFilePdf />}
                  disableRipple
                  variant="gradient"
                  size="extraLarge"
                >
                  <TranslatableText>myCv</TranslatableText>
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
