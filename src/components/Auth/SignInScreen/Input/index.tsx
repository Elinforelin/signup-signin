import React, { ChangeEventHandler, FC, MouseEvent, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';

import classes from './styles.module.css';

interface InputProps {
  errorText: string;
  type: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value: string | number;
  withEyeIcon?: boolean;
  label: string;
}

const Input: FC<InputProps> = ({
  errorText = '',
  type = 'text',
  name,
  value,
  onChange,
  withEyeIcon,
  label,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(!withEyeIcon);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const passwordInputType = !showPassword ? 'password' : 'text';

  return (
    <FormControl sx={{ m: 0, position: 'relative' }} variant="filled">
      <div
        className={`${classes.label} ${
          errorText ? classes.errorLabel : classes.label
        }`}
      >
        {label}
      </div>
      <OutlinedInput
        name={name}
        type={withEyeIcon ? passwordInputType : type}
        onChange={onChange}
        value={value}
        classes={{
          root: classes.outlinedInput,
          notchedOutline: classes.notchedOutline,
          focused: classes.focusedInput,
          input: classes.input,
        }}
        endAdornment={
          withEyeIcon ? (
            <InputAdornment position="end">
              <IconButton
                classes={{
                  root: classes.button,
                }}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
      <FormHelperText
        sx={{ margin: 0, position: 'absolute', top: 58 }}
        error={!!errorText}
      >
        {errorText}
      </FormHelperText>
    </FormControl>
  );
};

export default Input;
