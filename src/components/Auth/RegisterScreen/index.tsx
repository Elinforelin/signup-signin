import React, { Dispatch, FC, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

import Screen from '../Screen';

interface RegisterScreenProps {
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  setFirstTimeLogged: Dispatch<SetStateAction<boolean>>;
}

const RegisterScreen: FC<RegisterScreenProps> = ({
  setIsLogged,
  setFirstTimeLogged,
}) => {
  const history = useHistory();

  const onLoginPage = () => {
    history.push('./login');
  };
  return (
    <>
      <Screen
        title="Register"
        setIsLogged={setIsLogged}
        mainBtn="Register"
        loginOrRegisterBtn={onLoginPage}
        loginOrRegisterBtnTitle="Login"
        subTitle="Already have account?"
        setFirstTimeLogged={setFirstTimeLogged}
      />
    </>
  );
};

export default RegisterScreen;
