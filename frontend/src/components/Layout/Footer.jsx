import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
function Footer() {
  const anoAtual = new Date().getFullYear();
  return (
    <AppBar position="static" style={{ marginTop: '3rem' }}>
      <Container maxWidth="xl">
        <Toolbar className={styles.footerContainer}>
          <Typography variant="h6" component="h6">
            &copy; 2023-{anoAtual} Created by{' '}
            <Link
              to={'https://www.linkedin.com/in/jonas-nutels-dev/'}
              target="_blank"
            >
              <span className={styles.nomeDev}>Jonas Nutels</span>
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Footer;
