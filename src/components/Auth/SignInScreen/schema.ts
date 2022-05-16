import { object, string } from 'yup';

const schema = object().shape({
  password: string()
    .matches(new RegExp('^[a-zA-Z0-9]{3,30}$'), 'Invalid password')
    .required('Required field'),
  email: string().email('Invalid email').required('Required field'),
});

export default schema;
