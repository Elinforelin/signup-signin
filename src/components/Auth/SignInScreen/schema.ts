import { object, string, ref } from 'yup';

const getSchema = (isLoginForm: boolean) =>
  object().shape({
    fullName: string().when([], () => {
      if (isLoginForm) {
        return string();
      }
      return string()
        .min(2, 'Must be at least 2 characters')
        .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Please enter your full name.')
        .required('Required field');
    }),
    password: string()
      .min(12)
      .matches(new RegExp('^[a-zA-Z0-9]{3,30}$'), 'Invalid password')
      .required('Required field'),
    email: string().email('Invalid email').required('Required field'),
    confirmPassword: string().when([], () => {
      if (isLoginForm) {
        return string();
      }
      return string()
        .oneOf([ref('password'), null], 'Passwords must match')
        .required('Required field');
    }),
  });

export default getSchema;
