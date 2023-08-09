/*eslint-disable*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation, BottomNavigationAction, Menu, MenuItem, Typography, Badge,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import MoreIcon from '@mui/icons-material/More';
import { Toolbar } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { sessionActions } from '../../store';
import { useTranslation } from './LocalizationProvider';
import { useRestriction } from '../util/permissions';
import { nativePostMessage } from './NativeInterface';

const useStyles = makeStyles((theme) => ({
  flex: {
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
    },
  },
  appBarContainer: {
    maxHeight: 60,
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: '0px 10px 40px rgba(82, 85, 114, 0.3)',
  },
  appBarCollapsed: {
    maxHeight: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    boxShadow: '0px 10px 40px rgba(82, 85, 114, 0.3)',
    maxWidth: '175px',
    marginLeft: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'transparent',
    padding: 0,
    paddingBottom: '7px',
    overflowX: 'auto',
    maxWidth: '100vw',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '14px',
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logoContainer: {
    maxWidth: '60%',
    marginLeft: 'auto',
    paddingRight: 10,
  },
  logoContainer2: {
    maxWidth: '100%',
    paddingRight: 10,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  notActiveName: {
    display: 'none',
    color: '#A9B1C7',
    listStyle: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginRight: 15,
    },
  },
  activeName: {
    display: 'none',
    color: '#ffffff',
    listStyle: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginRight: 15,
    },
  },
  margin2: {
    marginRight: 5,
    marginLeft: -5,
    color: '#0352DA',
    [theme.breakpoints.up('sm')]: {
      margin: 0,
    },
  },
  activeLink: {
    marginRight: '-35px',
    marginLeft: '-5px',
    color: '#ffffff',
    [theme.breakpoints.up('sm')]: {
      marginRight: '-20px',
      marginLeft: '10px',
    },
    [theme.breakpoints.up('md')]: {
      marginRight: '-15px',
      marginLeft: '10px',
    },
  },
  notActiveLink: {
    marginRight: '-35px',
    marginLeft: '-5px',
    color: '#A9B1C7',
    [theme.breakpoints.up('sm')]: {
      marginRight: '-15px',
      marginLeft: '10px',
    },
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      width: 125,
      height: 30,
      marginRight: 10,
    },
  },
  logo2: {
    width: 125,
    height: 30,
    marginLeft: 30,
    marginTop: 5,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A9B1C7 !important',
  },
  active: {
    paddingLeft: 8,
    paddingRight: 7,
    background: '#0352DA',
    borderRadius: 5,
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 13,
      paddingBottom: 13,
    },
  },
  menu: {
    marginTop: '-35px',
    marginLeft: -10,
    [theme.breakpoints.up('sm')]: {
      marginTop: '-60px',
      marginLeft: 8,
    },
  },
  navCollapsed: {
    cursor: 'pointer',
    position: 'absolute',
    background: '#A9B1C7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '22px',
    width: '22px',
    borderRadius: '50%',
    left: '-11px',
    top: '14px',
    zIndex: 10,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navLinksCollapsed: {
    display: 'none',
  },
  appBar2: {
    maxWidth: '200px',
    marginLeft: 'auto',
    zIndex: theme.zIndex.drawer + 1,
    background: '#fff',
    padding: 0,
    paddingBottom: '7px',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '14px',
    },
  },
  navigation: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexWrap: 'nowrap',
      '-webkit-overflow-scrolling': 'touch', /* For smooth scrolling on iOS devices */
    },
  },
}));

const BottomMenu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const t = useTranslation();

  const disableReports = useRestriction('disableReports');
  const user = useSelector((state) => state.session.user);
  const socket = useSelector((state) => state.session.socket);

  const currentSelection = () => {
    if (location.pathname === `/settings/user/${user.id}`) {
      return 'account';
    } if (location.pathname.startsWith('/settings')) {
      return 'settings';
    } if (location.pathname.startsWith('/reports')) {
      return 'reports';
    } if (location.pathname === '/') {
      return 'map';
    }
    return null;
  };

  const handleLogout = async () => {

    const notificationToken = window.localStorage.getItem('notificationToken');
    if (notificationToken && !user.readonly) {
      window.localStorage.removeItem('notificationToken');
      const tokens = user.attributes.notificationTokens?.split(',') || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens: tokens.length > 1 ? tokens.filter((it) => it !== notificationToken).join(',') : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch('/api/session', { method: 'DELETE' });
    nativePostMessage('logout');
    navigate('/login');
    dispatch(sessionActions.updateUser(null));
  };

  const handleSelection = (event, value) => {
    switch (value) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'map':
        navigate('/map');
        break;
      case 'reports':
        navigate('/reports/combined');
        break;
      case 'settings':
        navigate('/settings/preferences');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const [drawer, setDrawer] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [navCollapsed, setNavCollapsed] = React.useState(false);

  const closeDrawer = () => {
    setDrawer(false);
  };

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (

    <>
      <div
        className={
          `${navCollapsed ? classes.navLinksCollapsed : classes.appBarContainer}`
        }
      >
        <Toolbar className={classes.appBar}>
          <div
            tabIndex={0}
            className={classes.list}
            role="button"
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className={classes.navCollapsed}
                onClick={() => setNavCollapsed(!navCollapsed)}
              >
                {!navCollapsed ? (
                  <ChevronRightIcon
                    style={{ color: '#fff', fontSize: '24px' }}
                  />
                ) : (
                  <ChevronLeftIcon
                    style={{ color: '#fff', fontSize: '24px' }}
                  />
                )}
              </div>
              <>
                <BottomNavigation value={currentSelection()} onChange={handleSelection} className={classes.navigation} showLabels>
                  <ListItem
                    style={{ cursor: 'pointer' }}
                    onClick={handleMobileMenuOpen}
                    className={classes.margin2}
                  >
                    <MoreIcon />
                  </ListItem>
                  <Menu
                    anchorEl={mobileMoreAnchorEl}
                    id={mobileMenuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMobileMenuOpen}
                    onClose={handleMobileMenuClose}
                    className={classes.menu}
                  >
                    <MenuItem onClick={handleLogout}>
                      <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        style={{ marginLeft: '-10px' }}
                      >
                        <ExitToAppIcon />
                      </IconButton>
                      {t('loginLogout')}
                    </MenuItem>
                  </Menu>
                  <BottomNavigationAction
                    style={{ cursor: 'pointer' }}
                    className={
                      (classes.listItem,
                        window.location.hash === '#/dashboard' && classes.active)
                    }
                    label={t('dashboardTitle')}
                    icon={(
                      <Badge color="error" variant="dot" overlap="circular" invisible={socket !== false}>
                        <DashboardIcon />
                      </Badge>
                    )}
                    value="dashboard"
                  />
                  <BottomNavigationAction
                    style={{ cursor: 'pointer' }}
                    className={
                      (classes.listItem,
                        window.location.hash === '#/map' && classes.active)
                    }
                    label={t('mapTitle')} icon={<MapIcon />} value="map" />
                  {!disableReports && (
                    <BottomNavigationAction
                      style={{ cursor: 'pointer' }}
                      className={
                        (classes.listItem,
                          window.location.hash === '#/reports' &&
                          classes.active)
                      }
                      label={t('reportTitle')} icon={<DescriptionIcon />} value="reports" />
                  )}
                  <BottomNavigationAction
                    style={{ cursor: 'pointer' }}
                    className={
                      (classes.listItem,
                        window.location.hash === '#/settings' &&
                        classes.active)
                    }
                    label={t('settingsTitle')} icon={<SettingsIcon />} value="settings" />
                </BottomNavigation>

              </>
            </div>
          </div>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            &nbsp;
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </div>
      <div
        className={
          !navCollapsed ? classes.navLinksCollapsed : classes.appBarCollapsed
        }
      >
        <Toolbar className={classes.appBar}>
          <div
            tabIndex={0}
            className={classes.list}
            role="button"
            onClick={closeDrawer}
            onKeyDown={closeDrawer}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className={classes.navCollapsed}
                onClick={() => setNavCollapsed(!navCollapsed)}
              >
                {!navCollapsed ? (
                  <ChevronRightIcon
                    style={{ color: '#fff', fontSize: '28px' }}
                  />
                ) : (
                  <ChevronLeftIcon
                    style={{ color: '#fff', fontSize: '28px' }}
                  />
                )}
              </div>
            </div>
          </div>
        </Toolbar>
      </div>
    </>
  );
};
/* eslint-enable */
export default BottomMenu;
