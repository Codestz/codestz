import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export function WithHeader() {
  return (
    <Grid container>
      <Header />
      <Outlet />
    </Grid>
  );
}
