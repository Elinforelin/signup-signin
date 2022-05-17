import React, { createContext, useState } from 'react';
import MuiAlert, { AlertColor } from '@mui/lab/Alert';
import { Alert, Snackbar } from '@mui/material';

import classes from './styles.module.css';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

export const UIContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
  });
  const handleClose = () =>
    setAlert({
      show: false,
    });

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar
        open={alert.show}
        autoHideDuration={4000}
        onClose={handleClose}
        sx={{ height: '5%' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          icon={false}
          elevation={6}
          variant="filled"
          classes={{
            filledSuccess: classes.snackbar,
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </UIContext.Provider>
  );
};
