/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import {
  Grid, Typography, Select, MenuItem, FormControl, Button, TextField, Snackbar, IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from '../store'
import { useLocalization, useTranslation } from '../common/components/LocalizationProvider'
import { handleLoginTokenListeners, nativeEnvironment, nativePostMessage } from '../common/components/NativeInterface'
import { useCatch } from '../reactHelper';
import LoginLayout from '../login/LoginLayout'
import usePersistedState from '../common/util/usePersistedState';
import fleemooIcon from '../resources/images/data/logo.png'

const useStyles = makeStyles((theme) => ({
  options: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  titleContainer: {
    marginTop: '0px',
    marginBottom: '30px',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '40px',
    },
  },
  title: {
    fontSize: theme.spacing(4),
    fontWeight: 600,
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.3),
    },
  },
  logoContainer: {
    textAlign: 'center',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      marginTop: 50,
    },
  },
  extraContainer: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  registerButton: {
    minWidth: 'unset',
    float: 'left',
  },
  resetPassword: {
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  resetregesterdiv: {
    overflow: 'auto',
  },
  input: {
    fontSize: '15px',
    letterSpacing: '0.625px',
    color: '#A9B1C7',
    background: '#F2F2F2',
    boxShadow: '0px 0px 10px -5px rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  submit: {
    fontSize: '18px',
    letterSpacing: '0.625px',
    color: '#FFFFFF',
    background: '#033CD3',
    borderRadius: '10px',
    '&:hover': {
      background: '#033CD3',
      opacity: 0.9,
    },
  },
  language: {
    fontSize: '16px',
    letterSpacing: '0.625px',
    color: '#A9B1C7',
    background: '#fff',
    textAlign: 'right',
    width: 'max-content',
    marginLeft: 'auto',
  },
  resetLink: {
    cursor: 'pointer',
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: '0.625px',
    color: '#A9B1C7',
    paddingTop: '5px',
    paddingRight: '5px',
    float: 'right',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useTranslation();


  const { languages, language, setLanguage } = useLocalization();
  const languageList = Object.entries(languages).map((values) => ({ code: values[0], name: values[1].name }));

  const [failed, setFailed] = useState(false);

  const [email, setEmail] = usePersistedState('loginEmail', '');
  const [password, setPassword] = useState('');

  const [announcementShown, setAnnouncementShown] = useState(false);
  const announcement = useSelector((state) => state.session.server?.announcement);

  const registrationEnabled = useSelector((state) => state.session.server.registration);
  const languageEnabled = useSelector((state) => !state.session.server.attributes['ui.disableLoginLanguage']);


  const generateLoginToken = async () => {
    if (nativeEnvironment) {
      let token = '';
      try {
        const expiration = moment().add(6, 'months').toISOString();
        const response = await fetch('/api/session/token', {
          method: 'POST',
          body: new URLSearchParams(`expiration=${expiration}`),
        });
        if (response.ok) {
          token = await response.text();
        }
      } catch (error) {
        token = '';
      }
      nativePostMessage(`login|${token}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        body: new URLSearchParams(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`),
      });
      if (response.ok) {
        const user = await response.json();
        generateLoginToken();
        dispatch(sessionActions.updateUser(user));
        navigate('/');
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      setFailed(true);
      setPassword('');
    }
  };

  const handleTokenLogin = useCatch(async (token) => {
    const response = await fetch(`/api/session?token=${encodeURIComponent(token)}`);
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      navigate('/');
    } else {
      throw Error(await response.text());
    }
  });

  const handleSpecialKey = (e) => {
    if (e.keyCode === 13 && email && password) {
      handleSubmit(e);
    }
  };

  useEffect(() => nativePostMessage('authentication'), []);

  useEffect(() => {
    const listener = (token) => handleTokenLogin(token);
    handleLoginTokenListeners.add(listener);
    return () => handleLoginTokenListeners.delete(listener);
  }, []);


  return (
    <LoginLayout>
      <Grid container direction="column" spacing={2}>
        <Grid item xs className={classes.titleContainer}>
          <Typography className={classes.title} color="primary">
            {t('loginTitle')}
          </Typography>
          <Typography>
            {t('loginSubTitle')}
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.container}>
        <Grid item>
          <TextField
            required
            fullWidth
            error={failed}
            label={t('userEmail')}
            name="email"
            value={email}
            autoComplete="email"
            autoFocus={!email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={handleSpecialKey}
            helperText={failed && 'Invalid username or password'}
            variant="filled"
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <TextField
            required
            fullWidth
            error={failed}
            label={t('userPassword')}
            name="password"
            value={password}
            type="password"
            autoComplete="current-password"
            autoFocus={!!email}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={handleSpecialKey}
            variant="filled"
            className={classes.input}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleSubmit}
            onKeyUp={handleSpecialKey}
            variant="contained"
            color="secondary"
            disabled={!email || !password}
            fullWidth
            className={classes.submit}
          >
            {t('loginLogin')}
          </Button>
          <div className={classes.resetregesterdiv}>
            <Button
              className={classes.registerButton}
              onClick={() => navigate('/register')}
              disabled={!registrationEnabled}
              color="secondary"
            >
              {t('loginRegister')}
            </Button>
            <a href="#foo" aria-hidden className={classes.resetLink} onClick={() => navigate('/reset-password')}>
              {t('loginReset')}
            </a>
          </div>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs className={classes.logoContainer}>
            <img src={fleemooIcon} alt="" width="125" height="30" />
            {
              languageEnabled &&
              <FormControl variant="filled" fullWidth>
                <Select
                  label={t('loginLanguage')}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={classes.language}
                >
                  {languageList.map((it) => (
                    <MenuItem key={it.code} value={it.code}>
                      {' '}
                      {it.name}
                      {' '}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>}
          </Grid>
        </Grid>
      </div>

      <Snackbar
        open={!!announcement && !announcementShown}
        message={announcement}
        action={(
          <IconButton size="small" color="inherit" onClick={() => setAnnouncementShown(true)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      />
    </LoginLayout >
  );
};
/* eslint-enable */
export default LoginPage;
