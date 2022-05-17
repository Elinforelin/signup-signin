import React, {
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Box, Menu, MenuItem } from '@mui/material';

import classes from './style.module.css';
import appbar from '../../../assets/img/appbar.svg';
import { UIContext } from '../UIContext';

interface HomeScreenProps {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  showAlert: boolean;
  setFirstTimeLogged: Dispatch<SetStateAction<boolean>>;
}

const HomeScreen: FC<HomeScreenProps> = ({
  setIsLogged,
  showAlert = false,
  setFirstTimeLogged,
}) => {
  const { setAlert } = useContext(UIContext);

  const handleSignIn = useMemo(async () => {
    setAlert({
      show: showAlert,
      severity: 'info',
      message: 'Welcome on board 🚀',
    });
  }, [setAlert, showAlert]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    setIsLogged(false);
    localStorage.removeItem('isLogged');
    setFirstTimeLogged(false);
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <header>
        <div className={classes.container}>
          <div className={classes.menu}>
            <div className={classes.menuItems}>
              <div className={classes.item}>
                <img src={appbar} alt="" />
              </div>
              <div className={classes.logo}>Voypost</div>
            </div>
            <button
              type="button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className={classes.avatar}
            >
              DS
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{
                paper: classes.menuPaper,
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </header>
    </Box>
  );
};

export default HomeScreen;
