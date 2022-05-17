import React, { FC, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { useUser } from 'reactfire';
import AuthenticatedLayout from '../AuthenticatedLayout';
import GuestLayout from '../GuestLayout';
import HomeScreen from '../HomeScreen';
import NotFoundScreen from '../NotFoundScreen';
import SignInScreen from '../../Auth/SignInScreen';
import RegisterScreen from '../../Auth/RegisterScreen';

const Root: FC = () => {
  // const {
  //   data: user,
  //   // hasEmitted,
  //   firstValuePromise,
  // } = useUser();
  // const [isUserLoaded, setIsUserLoaded] = useState(false);
  // const isLogged = !!user;
  // useEffect(() => {
  //   firstValuePromise.then(() => setIsUserLoaded(true));
  // }, [firstValuePromise, setIsUserLoaded]);

  // doesn't always work, but suddenly works when subscribing to `firstValuePromise`
  // thus we use `isUserLoaded` below
  // if (!hasEmitted) {
  //   return null;
  // }
  // if (!isUserLoaded) {
  //   return null;
  // }

  const [firstTimeLogged, setFirstTimeLogged] = useState(false);

  const [isLogged, setIsLogged] = useState<boolean>(
    !!localStorage.getItem('isLogged'),
  );

  if (isLogged) {
    return (
      <AuthenticatedLayout>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomeScreen
                setIsLogged={setIsLogged}
                showAlert={firstTimeLogged}
                setFirstTimeLogged={setFirstTimeLogged}
              />
            )}
          />
          <Route exact path="/login" component={() => <Redirect to="/" />} />
          <Route exact path="/register" component={() => <Redirect to="/" />} />
          <Route path="*" component={NotFoundScreen} />
        </Switch>
      </AuthenticatedLayout>
    );
  }
  return (
    <GuestLayout>
      <Switch>
        <Route
          exact
          path="/login"
          render={() => <SignInScreen setIsLogged={setIsLogged} />}
        />
        <Route
          exact
          path="/register"
          render={() => (
            <RegisterScreen
              setFirstTimeLogged={setFirstTimeLogged}
              setIsLogged={setIsLogged}
            />
          )}
        />
        <Redirect to="/login" />
      </Switch>
    </GuestLayout>
  );
};

export default Root;
