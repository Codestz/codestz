import { Grid, Box, Button, useTheme } from '@mui/material';
import cn from 'classnames';
import { BsChevronCompactDown } from 'react-icons/bs';
import { PiWaveTriangle, PiPaperPlaneRightFill } from 'react-icons/pi';
import { TranslatableText } from '@codestz/common-ui';
import styles from './Landing.module.scss';

export function Landing() {
  const { palette } = useTheme();
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Box className={styles['landing']} position={'relative'}>
          <Box className={styles['title']} position={'relative'}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} gap={4}>
              <TranslatableText className={cn(styles['text'], styles['gradient'])} variant="h1">
                software
              </TranslatableText>
              <Box>
                <PiWaveTriangle size={120} color={palette.secondary.main} />
              </Box>
            </Box>
            <TranslatableText className={cn(styles['text'], styles['simple'])} variant="h1">
              developer
            </TranslatableText>
            <Box className={styles['blurGradient']} />
          </Box>
          <Box display={'flex'} justifyContent={'center'}>
            <Button
              disableRipple
              className={styles['gradientBtn']}
              endIcon={<PiPaperPlaneRightFill />}
              size={'extraLarge'}
              variant="gradient"
            >
              <TranslatableText variant="h3">letsTalk</TranslatableText>
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2}>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <TranslatableText variant="h1" fontWeight={400}>
                experience
              </TranslatableText>
            </Grid>
            <Grid item xs={6}>
              <TranslatableText variant="h3" fontWeight={30}>
                iHelp
              </TranslatableText>
            </Grid>
          </Grid>
          <BsChevronCompactDown className={styles['jump']} color={palette.text.primary} size={40} />
        </Box>
      </Grid>
    </Grid>
  );
}
