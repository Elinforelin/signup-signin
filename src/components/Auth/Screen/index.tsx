import React, { Dispatch, FC, MouseEventHandler, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import { withFormikDevtools } from 'formik-devtools-extension';
import { useRouteMatch } from 'react-router-dom';

import classes from './styles.module.css';
import img from '../../../assets/img/hero.jpg';
import logo from '../../../assets/img/logo.svg';
import Input from './Input';
import getSchema from '../SignInScreen/schema';

interface ScreenProps {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  mainBtn: string;
  loginOrRegisterBtn: MouseEventHandler<HTMLButtonElement>;
  loginOrRegisterBtnTitle: string;
  subTitle: string;
  title: string;
  setFirstTimeLogged?: Dispatch<SetStateAction<boolean>>;
}

const Screen: FC<ScreenProps> = ({
  setIsLogged,
  mainBtn,
  loginOrRegisterBtn,
  loginOrRegisterBtnTitle,
  subTitle,
  title,
  setFirstTimeLogged,
}) => {
  const match = useRouteMatch();

  const isRegisterForm = match.path === '/register';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    },
    validateOnChange: false,
    validationSchema: getSchema(!isRegisterForm),
    onSubmit: () => {
      if (isRegisterForm && setFirstTimeLogged) {
        setFirstTimeLogged(true);
      }
      localStorage.setItem('isLogged', 'true');
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
                <div
                  className={`${classes.title} ${
                    isRegisterForm && classes.titleRegistration
                  }`}
                >
                  {title}
                </div>
                <Input
                  errorText={formik.errors.email ?? ''}
                  name="email"
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  label="Email"
                />
                {isRegisterForm && (
                  <Input
                    errorText={formik.errors.fullName ?? ''}
                    name="fullName"
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.fullName}
                    label="Full name"
                  />
                )}
                <Input
                  errorText={formik.errors.password ?? ''}
                  name="password"
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  label="Password"
                  withEyeIcon
                />
                {isRegisterForm && (
                  <>
                    <Input
                      errorText={formik.errors.confirmPassword ?? ''}
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      type="password"
                      value={formik.values.confirmPassword}
                      label="Repeat password"
                      withEyeIcon
                    />
                  </>
                )}

                <button
                  disabled={formik.isSubmitting}
                  className={`${classes.rootButton}
                      ${isRegisterForm && classes.rootButtonWithMargin}`}
                  type="button"
                  onClick={formik.submitForm}
                >
                  {mainBtn}
                </button>
                <div>
                  <div className={classes.subTitle}>
                    {subTitle}
                    <button
                      onClick={loginOrRegisterBtn}
                      className={classes.registerBtn}
                      type="button"
                    >
                      {loginOrRegisterBtnTitle}
                    </button>
                  </div>
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
      </Box>
    </>
  );
};

export default Screen;
