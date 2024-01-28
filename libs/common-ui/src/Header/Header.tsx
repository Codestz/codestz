import { Fragment, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Fade, JackInTheBox } from 'react-awesome-reveal';
import { FaGithub, FaTiktok } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { ThemedIcon } from '../ThemedIcon/ThemedIcon';
import styles from './Header.module.scss';

export function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box className={styles['container']} p={3}>
      <Fade>
        <Box display={'flex'} gap={1}>
          <Typography variant="h1">Esteban</Typography>
          <Typography
            variant="h1"
            color={'primary'}
            sx={{
              transition: 'all 0.3s ease-in-out',
              color: scrollPosition > 500 ? '#ffffff48' : 'primary.main',
            }}
          >
            Codestz
          </Typography>
        </Box>
      </Fade>
      <Box display={'flex'} gap={3}>
        {scrollPosition > 500 && (
          <JackInTheBox>
            <ThemedIcon icon={IoMdMail} link="mailto:est.estrada@outlook.com" />
          </JackInTheBox>
        )}
        {scrollPosition < 500 && (
          <Fragment>
            <JackInTheBox>
              <ThemedIcon icon={FaTiktok} link="https://tittok.com" />
            </JackInTheBox>
            <JackInTheBox>
              <ThemedIcon icon={FaGithub} link="https://github.com/Codestz" />
            </JackInTheBox>
          </Fragment>
        )}
      </Box>
    </Box>
  );
}
