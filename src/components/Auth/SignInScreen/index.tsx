import React, { Dispatch, FC, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

import Screen from '../Screen';

interface SignInScreenProps {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

const SignInScreen: FC<SignInScreenProps> = ({ setIsLogged }) => {
  const history = useHistory();

  const onRegister = () => {
    history.push('/register');
  };

  return (
    <>
      <Screen
        setIsLogged={setIsLogged}
        mainBtn="Sign in"
        title="Login"
        loginOrRegisterBtn={onRegister}
        loginOrRegisterBtnTitle="Register"
        subTitle="Don’t have an account?"
      />
    </>
  );
};

export default SignInScreen;
