import { Box, Chip, Grid, Typography } from '@mui/material';
import cn from 'classnames';
import { TranslatableText } from '../TranslatableText/TranslatableText';
import styles from './ProjectCard.module.scss';
import { ProjectCardProps } from './ProjectCard.types';

export function ProjectCard({
  leftImage,
  rightImage,
  name,
  primaryColor,
  secondaryColor,
  index,
  description,
  link,
}: ProjectCardProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'} gap={2}>
            <Typography
              className={cn(styles['text'], styles['gradient'])}
              variant="h2"
              textTransform={'uppercase'}
              sx={{
                backgroundImage: `linear-gradient(90deg, ${secondaryColor} 0%, ${primaryColor} 100%)`,
                backgroundClip: 'text',
              }}
            >
              {name}
            </Typography>
            <Chip
              variant="outlined"
              label={'Wordpress'}
              sx={{
                fontSize: 'body1.fontSize',
              }}
            />
          </Box>
          <Typography className={cn(styles['text'], [styles['simple']])} variant="h2">
            {(index || 0) > 10 ? index : `0${index}`}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          className={styles['card']}
          sx={{
            backgroundImage: `linear-gradient(180deg, ${primaryColor} 0%, ${secondaryColor} 100%) !important`,
          }}
        >
          <Box className={styles['image']}>
            <img src={leftImage} alt={`${name}_picture_left`} />
          </Box>
          <Box className={styles['image']}>
            <img src={rightImage} alt={`${name}_picture_right`} />
          </Box>
          <Box className={styles['information']} gap={3}>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            </Typography>
            <a href={link} target="_blank" className={styles['link']} rel="noreferrer">
              <TranslatableText>seeWebsite</TranslatableText>
            </a>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
