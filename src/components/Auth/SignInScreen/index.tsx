import React, { Dispatch, FC, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import { withFormikDevtools } from 'formik-devtools-extension';

import classes from './styles.module.css';
import img from '../../../assets/img/hero.jpg';
import logo from '../../../assets/img/logo.svg';
import Input from './Input';
import schema from './schema';

interface SignInScreenProps {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

const SignInScreen: FC<SignInScreenProps> = ({ setIsLogged }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: schema,
    onSubmit: () => {
      setIsLogged(true);
    },
  });

  withFormikDevtools(formik);

  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <div className={classes.container}>
          <div className={classes.img}>
            <img src={img} alt="apartment" />
          </div>
          <Grid
            sx={{
              alignContent: 'flex-start',
            }}
            container
            classes={{
              root: classes.grid,
            }}
          >
            <div className={classes.logo}>
              <img src={logo} alt="voypost" />
            </div>
            <Grid item xs={12}>
              <form onSubmit={formik.handleSubmit} className={classes.form}>
                <div className={classes.title}>Login</div>
                <Input
                  errorText={formik.errors.email ?? ''}
                  name="email"
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  label="Email"
                />
                <Input
                  errorText={formik.errors.password ?? ''}
                  name="password"
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  label="Password"
                  withEyeIcon
                />

                <button
                  disabled={formik.isValid && !formik.dirty}
                  className={classes.rootButton}
                  type="button"
                  onClick={formik.submitForm}
                >
                  Sign in
                </button>
              </form>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default SignInScreen;
