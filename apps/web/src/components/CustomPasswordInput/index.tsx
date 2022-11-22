import { FC, InputHTMLAttributes, useRef, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}
export const CustomPasswordInput: FC<InputProps> = ({ id, label, ...rest }) => {
  const inputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="w-full flex justify-end items-center relative">
        <input
          ref={inputRef}
          {...rest}
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
        />
        {showPassword ? (
          <IoEyeOutline
            className="absolute mr-2 z-20 w-10"
            onClick={handleClickShowPassword}
            cursor="pointer"
          />
        ) : (
          <IoEyeOffOutline
            className="absolute mr-2 z-20 w-10"
            onClick={handleClickShowPassword}
            cursor="pointer"
          />
        )}
      </div>
    </div>
  );
};
