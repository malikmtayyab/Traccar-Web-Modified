/*eslint-disable*/
import React from 'react';
import { useMediaQuery, useTheme, Paper, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    [theme.breakpoints.up('lg')]: {
    },
  },
  form: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: theme.spacing(52),
      padding: theme.spacing(4),
    },
  },
  paperCustom: {
    padding: '0',
    borderStyle: 'none',
    backgroundColor: 'gray',
    borderRadius: '0',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#fff',
    },
  },
  formContainer1: {
    width: '100%',
    maxWidth: '850px',
    height: '600px ! important',
    alignItems: 'center',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 2px 1px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    paddingRight: '0',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      borderRadius: '0px',
      height: '100%',
    },
  },
  formContainer2: {
    width: '100%',
    maxWidth: '1050px',
    height: '600px ! important',
    alignItems: 'center',
    borderRadius: '12px',
    backgroundColor: '#fff',
    display: 'flex',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
      borderRadius: '0px',
      height: '100%',
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: '50px',
    },
  },
  formContainerTop1: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    background: 'url(/images/reset-bg.svg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left',
  },
  formContainerTop2: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    background: 'url(/images/login-bg.svg)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
  },
  centeredInParent: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const PageLayout = ({ children, resetpage }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <main className={classes.root}>
      <Paper className={[classes.paper, classes.paperCustom].join(' ')}>
        <Container
          className={
            resetpage ? classes.formContainer1 : classes.formContainer2
          }
        >
          <Grid
            container
            spacing={2}
            style={{
              height: '100%',
            }}
          >
            {!useMediaQuery(theme.breakpoints.down('xs')) && (
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                className={classes.centeredInParent}
              >
                <form className={classes.form}>{children}</form>
              </Grid>
            )}
            {!useMediaQuery(theme.breakpoints.down('xs')) && (
              <Grid
                item
                xs={6}
                sm={6}
                md={6}
                className={
                  resetpage
                    ? classes.formContainerTop1
                    : classes.formContainerTop2
                }
              >
              </Grid>
            )}
            {useMediaQuery(theme.breakpoints.down('xs')) && (
              <Grid item xs={12} className={classes.centeredInParent}>
                <form className={classes.form}>{children}</form>
              </Grid>
            )}
          </Grid>
        </Container>
      </Paper>
    </main>
  );
};
/*eslint-disable*/
export default PageLayout;
